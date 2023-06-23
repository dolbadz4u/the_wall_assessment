const dbconnection = require("../models/Connection");
const mysql = require("mysql2");

class User{
    registerUser = async (user_details) => {
        let response_data = { status: false, result: [], error: null };

        try{
            let insert_user_details = mysql.format(`INSERT INTO users (first_name, last_name, email, password, created_at, updated_at)
                                                    VALUES (?, ?, ?, ?, NOW(), NOW())`, user_details);

            response_data = await dbconnection.executeQuery(insert_user_details);
        } 
        catch(error){
            response_data.error = error;
        }

        return response_data;
    }

    loginUser = async (login_details) => {
        let response_data = { status: false, result: [], error: null };
        
        try{
            let fetch_user = mysql.format(`SELECT * FROM users WHERE email = ? AND password = ?`, login_details);
            response_data = await dbconnection.executeQuery(fetch_user);
        }
        catch(error){
            response_data.error = error;
        }

        return response_data;
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

        if(!login_email){
            errors.push("Email required");
        }
        if(!login_password){
            errors.push("Password required");
        }
 
        return errors;
    }
}

module.exports = new User;