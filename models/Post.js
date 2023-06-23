const dbconnection = require("../models/Connection");
const mysql = require("mysql2");

class Post{
    getPostsComments = async () => {
        let response_data = { status: false, result: [], error: null };
        
        try{
            let fetch_posts = mysql.format(`SELECT posts.id, posts.message, posts.user_id AS user_id, DATE_FORMAT(posts.created_at, "%M/%d/%Y") AS created_at, CONCAT(users.first_name, " ", users.last_name) AS posted_by,
                                                (
                                                    SELECT JSON_OBJECTAGG(
                                                        comments.id, 
                                                        JSON_OBJECT(
                                                            'comment_id', comments.id,
                                                            'comment', comments.comment,
                                                            'message_id', comments.message_id,
                                                            'commented_by', CONCAT(users.first_name, " ", users.last_name),
                                                            'created_at', DATE_FORMAT(comments.created_at, "%M/%d/%Y"),
                                                            'comment_user_id', comments.user_id
                                                        )
                                                    )
                                                    FROM comments
                                                    INNER JOIN users ON users.id = comments.user_id
                                                    WHERE comments.message_id = posts.id
                                                    
                                                ) AS comments
                                            FROM posts
                                            INNER JOIN users ON users.id = posts.user_id
                                            ORDER BY posts.id DESC;`);

            response_data = await dbconnection.executeQuery(fetch_posts);
        }
        catch(error){
            response_data.error = error;
        }

        return response_data;
    }

    createPost = async (user_message) => {
        let response_data = { status: true, result: [], error: null };

        try{
            let insert_post = mysql.format(`INSERT INTO posts (user_id, message, created_at, updated_at)
                               VALUES (?, ?, NOW(), NOW())`, user_message);

            response_data = await dbconnection.executeQuery(insert_post);
        }
        catch(error){
            response_data.error = error;
        }

        return response_data;
    }

    deletePost = async (message_id, user_id) => {
        let response_data = { status: true, result: [], error: null };

        try{
            let delete_query = mysql.format(`DELETE FROM posts WHERE id = ? AND user_id = ?`, [ message_id, user_id ]);
           
            response_data = await dbconnection.executeQuery(delete_query);
        }
        catch(error){
            response_data.error = error;
        }

        return response_data;
    }

    validatePost = async (user_input) => {
        let response_data = { status: false, result: [], error: null };

        if(user_input === ""){
            response_data.error = "Message field should not be blank!";
        }
        else{
            response_data.status = true;
        }

        return response_data;
    }
}

module.exports = new Post;