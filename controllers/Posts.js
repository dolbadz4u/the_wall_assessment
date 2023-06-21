const Post = require("../models/Post");
const Comment = require("../models/Comment");

class Posts{
    showPosts = async (req, res) => {
        const posts = await Post.getPosts();
        const user = req.session.user_details;
        const comments = await Comment.getComments();
        res.render("wall", {posts: posts.result, user, comments: comments.result});
    }

    addPost = async (req, res) => {
        let user_message = [ req.session.user_details[0].id, req.body.post_field ];
        const result = await Post.createPost(user_message);

        if(result){
            res.redirect("/wall");
        }
    }

    deletePost = async (req, res) => {
        const user_id = req.session.user_details[0].id;
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