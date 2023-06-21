const db = require("../config/database");
const mysql = require("mysql2");

class User{
    registerUser = async (user_details) => {
        let response_data = { status: false, result: [], error: null };
        try{
            let insert_user_details = mysql.format(`INSERT INTO users (first_name, last_name, email, password, created_at, updated_at)
                                                    VALUES (?, ?, ?, ?, NOW(), NOW())`, user_details);

            response_data.status = true;
            response_data.result = db.query(insert_user_details);
        } 
        catch(error){
            response_data.error = error;
        }

        return response_data;
    }

    loginUser = async (login_details) => {
        let response_data = { status: false, result: [], error: null };
        
        try{
            let fetch_user = `SELECT * FROM users WHERE email = ? AND password = ?`;

            const result = await new Promise(function(resolve, reject){
                db.query(fetch_user, login_details, (error, result) => {
                    if(error){
                        response_data.error = error;
                        reject(response_data);
                    }
                    else{
                        response_data.status = true;
                        response_data.result = result;
                        resolve(result);
                    }
                });
            });

            return result;
        }
        catch(error){
            throw error;
        }
    }

    validateUserRegistration = async (user_details) => {
        const [ first_name, last_name, email, password, confirm_password ] = user_details;
        const errors = [];

        if(!first_name){
            errors.push("First name required");
        }
        if(!last_name){
            errors.push("Last name required");
        }
        if(!email){
            errors.push("Email required");
        }
        if(!password){
            errors.push("Password required");
        }
        if(!confirm_password){
            errors.push("Confirm password required");
        }
        if(password !== confirm_password){
            errors.push("Passwords should match");
        }

        return errors;
    }

    validateLoginDetails = async (login_details) => {
        const [ login_email, login_password ] = login_details;
        const errors = [];
        const user = await this.loginUser(login_details);

        if(!login_email){
            errors.push("Email required");
        }
        if(!login_password){
            errors.push("Password required");
        }
        if(!user || login_password !== user[0].password){
            errors.push("Invalid email or password");
        }
        
        return errors;
    }
}

module.exports = new User;