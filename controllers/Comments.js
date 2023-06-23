const Comment = require("../models/Comment");

class Comments{
    addComment = async (req, res) => {
        try{
            const validateComment = await Comment.validateComment( req.body.comment_field );

            if(validateComment.status){
                const result = await Comment.createComment( [ req.session.user.user_id, req.body.message_id, req.body.comment_field ] );
    
                if(result){
                    res.redirect("/wall");
                }
            }
            else{
                req.session.errors = validateComment.error;
                res.redirect("/wall");
            }
        }
        catch(error){
            throw error;
        }
    }

    deleteComment = async (req, res) => {
        const user_id = req.session.user.user_id;
        const comment_id = req.body.comment_id;

        try{
            const result = await Comment.deleteComment(comment_id, user_id);
            res.redirect("/wall");
        }
        catch(error){
            throw error;
        }
    }
}

module.exports = new Comments;