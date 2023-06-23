const User = require("../models/User");

class Users{
    showHome = (req, res) => {
        let errors = req.session.errors;
        req.session.errors = [];

        let success = req.session.success;
        req.session.success = "";
        
        req.session.user  ? res.redirect("/wall") : res.render("index", { errors, success });
    }

    register = async (req, res) => {
        try{
            let { first_name, last_name, email, password, confirm_password } = req.body;
            let user_details = [ first_name, last_name, email, password, confirm_password ];

            let success_message = "Registration Successful";

            let errors = await User.validateUserRegistration(user_details);

            if(errors.length > 0){
                req.session.errors = errors;
                return res.redirect("/");
            }

            let result = User.registerUser(user_details);

            if(result){
                req.session.success = success_message;
                return res.redirect("/");
            }
        }
        catch(error){
            console.error(error);
            res.redirect("/");
        }
    }

    login = async (req, res) => {
        try{
            let { login_email, login_password } = req.body;
            let login_details = [ login_email, login_password ];

            let errors = await User.validateLoginDetails(login_details);

            if(errors.length > 0){
                req.session.errors = errors;
                return res.redirect("/");
            }
            else{
                let user = await User.loginUser(login_details);

                if(user){
                    req.session.user = {
                        user_id : user.result[0].id
                    };
                    
                    res.redirect("/wall")
                }
                
            }
        }
        catch(error){
            console.error(error);
        }
    }

    logout = async (req, res) => {
        try{
            req.session.destroy(function(error){
                if(error){
                    throw error;
                }
                else{
                    console.log("Session Destroyed");
                    res.redirect("/");
                }
            });
        }
        catch(error){
            throw error;
        }
    }
}

module.exports = new Users;