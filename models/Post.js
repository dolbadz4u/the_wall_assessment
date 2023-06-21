const db = require("../config/database");

class Post{
    getPosts = async () => {
        let response_data = { status: false, result: [], error: null };
        
        try{
            let fetch_posts = `SELECT users.id AS user_id, posts.id AS message_id, posts.message, DATE_FORMAT(posts.created_at, '%M/%d/%Y') AS message_date, CONCAT(users.first_name, ' ', users.last_name) AS poster
                               FROM posts
                               INNER JOIN users ON users.id = posts.user_id
                               ORDER BY message_id DESC`;

            const result = await new Promise(function(resolve, reject){
                db.query(fetch_posts, function(error, result){
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

            return result;
        }
        catch(error){
            throw error;
        }
    }

    createPost = async (user_message) => {
        let response_data = { status: true, result: [], error: null };

        try{
            let insert_post = `INSERT INTO posts (user_id, message, created_at, updated_at)
                               VALUES (?, ?, NOW(), NOW())`;

            db.query(insert_post, user_message, function(error, result){
                if(error){
                    response_data.error = error;
                }
                else{
                    response_data.status = true;
                    response_data.result = result;
                }
            });
        }
        catch(error){
            throw error;
        }

        return response_data;
    }

    deletePost = async (message_id, user_id) => {
        let response_data = { status: true, result: [], error: null };
        try{
            let delete_query = `DELETE FROM posts WHERE id = ? AND user_id = ?`;
            const result = await new Promise(function(resolve, reject){
                db.query(delete_query, [ message_id, user_id ], function(error, result){
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

module.exports = new Post;