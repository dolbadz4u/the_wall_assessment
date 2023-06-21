const db = require("../config/database");

class Comment{
    getComments = async () => {
        return new Promise(function(resolve, reject){
            let response_data = { status: false, result: [], error: null };

            let fetch_comments = `SELECT users.id AS user_id, comments.id AS comment_id, comments.message_id, CONCAT(users.first_name, ' ', users.last_name) AS commenter, comment, DATE_FORMAT(comments.created_at, '%M/%d/%Y') AS comment_date
                                  FROM comments
                                  INNER JOIN users on users.id = comments.user_id`;


            db.query(fetch_comments, function(error, result){
                if(error){
                    response_data.error = error;
                    reject(response_data);
                }
                else{
                    response_data.status = true;
                    response_data.result = result;
                    resolve(response_data);
                }
            });
        });
    }

    createComment = async (user_comment) => {
            let response_data = { status: false, result: [], error: null };

        try{
            let insert_comment = `INSERT INTO comments (user_id, message_id, comment, created_at, updated_at)
                                  VALUES (?, ?, ?, NOW(), NOW())`;

            const result = await new Promise(function(resolve, reject){
                db.query(insert_comment, user_comment, function(error, result){
                    if(error){
                        response_data.error = error;
                        reject(response_data);
                    }
                    else{
                        response_data.status = true;
                        response_data.result = result;
                        resolve(response_data);
                    }
                });
            });

            return response_data;
        }
        catch(error){
           throw error; 
        }
    }

    deleteComment = async (comment_id, user_id, message_id) => {
        let response_data = { status: false, result: [], error: null };
        try{
            let delete_query = `DELETE FROM comments WHERE id = ? AND user_id = ? AND message_id = ?`;

            const result = await new Promise(function(resolve, reject){
                db.query(delete_query, [ comment_id, user_id, message_id ], function(error, result){
                    if(error){
                        response_data.error = error;
                        reject(response_data);
                    }
                    else{
                        response_data.status = true;
                        response_data.result = result;
                        resolve(response_data);
                    }
                });
            });

            return response_data;
        } 
        catch(error){
            throw error;
        }
    }
}

module.exports = new Comment;