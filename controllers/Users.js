const User = require("../models/User");

class Users{
    showHome = (req, res) => {
        const errors = req.session.errors;
        req.session.errors = [];

        const success = req.session.success;
        req.session.success = "";

        req.session.user_details ? res.redirect("/wall") : res.render("index", { errors, success });
    }

    register = async (req, res) => {
        try{
            const { first_name, last_name, email, password, confirm_password } = req.body;
            const user_details = [ first_name, last_name, email, password, confirm_password ];
            let success_message = "Registration Successful";

            const errors = await User.validateUserRegistration(user_details);

            if(errors.length > 0){
                req.session.errors = errors;
                return res.redirect("/");
            }

            const result = User.registerUser(user_details);

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
            const { login_email, login_password } = req.body;
            const login_details = [ login_email, login_password ];

            const errors = await User.validateLoginDetails(login_details);

            if(errors.length > 0){
                req.session.errors = errors;
                return res.redirect("/");
            }

            const result = await User.loginUser(login_details);

            if(result){
                req.session.user_details = result;
                res.redirect("/wall")
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