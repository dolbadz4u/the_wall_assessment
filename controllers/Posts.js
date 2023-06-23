const Post = require("../models/Post");

class Posts{
    showPosts = async (req, res) => {
        
        const posts = await Post.getPostsComments();
        const user = req.session.user;
        const errors = req.session.errors;
        req.session.errors = [];
        res.render("wall", {posts: posts.result, user, errors});
    }

    addPost = async (req, res) => {
        let user_message = [ req.session.user.user_id, req.body.post_field ];
        const validateMessage = await Post.validatePost(req.body.post_field);

        if(validateMessage.status){
            const result = await Post.createPost(user_message);
            
            if(result){
                res.redirect("/wall");
            }
        }
        else{
            req.session.errors = validateMessage.error;
            res.redirect("/wall");
        }

    }

    deletePost = async (req, res) => {
        const user_id = req.session.user.user_id;
        const message_id = req.body.message_id;

        try{
            const result = await Post.deletePost(message_id, user_id);
            res.redirect("/wall");
        }
        catch(error){
            throw error;
        }
    }
}

module.exports = new Posts;