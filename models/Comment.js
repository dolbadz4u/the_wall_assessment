const dbconnection = require("../models/Connection");
const mysql = require("mysql2");

class Comment{
    createComment = async (user_comment) => {
            let response_data = { status: false, result: [], error: null };

        try{
            let insert_comment = mysql.format(`INSERT INTO comments (user_id, message_id, comment, created_at, updated_at)
                                               VALUES (?, ?, ?, NOW(), NOW())`, user_comment);

            response_data = await dbconnection.executeQuery(insert_comment);
        }
        catch(error){
           response_data.error = error; 
        }

        return response_data;
    }

    deleteComment = async (comment_id, user_id) => {
        let response_data = { status: false, result: [], error: null };

        try{
            let delete_query = mysql.format(`DELETE FROM comments WHERE id = ? AND user_id = ?`, [ comment_id, user_id ]);

            response_data = await dbconnection.executeQuery(delete_query);
        } 
        catch(error){
            response_data.error = error;
        }

        return response_data;
    }

    validateComment = async (user_input) => {
        let response_data = { status: false, result: [], error: null };

        if(user_input === ""){
            response_data.error = "Comment field should not be blank!";
        }
        else{
            response_data.status = true;
        }

        return response_data;
    }
}

module.exports = new Comment;