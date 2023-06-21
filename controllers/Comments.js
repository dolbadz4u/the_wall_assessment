const Comment = require("../models/Comment");

class Comments{
    addComment = async (req, res) => {
        try{
            const user_comment = [ req.session.user_details[0].id, req.body.message_id, req.body.comment_field ];
            const result = await Comment.createComment(user_comment);

            if(result){
                res.redirect("/wall");
            }
        }
        catch(error){
            throw error;
        }
    }

    deleteComment = async (req, res) => {
        const user_id = req.session.user_details[0].id;
        const message_id = req.body.message_id;
        const comment_id = req.body.comment_id;

        try{
            const result = await Comment.deleteComment(comment_id, user_id, message_id);
            res.redirect("/wall");
        }
        catch(error){
            throw error;
        }
    }
}

module.exports = new Comments;