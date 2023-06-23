const Express = require("express");
const Router = Express.Router();
const Users = require("../controllers/Users");
const Posts = require("../controllers/Posts");
const Comments = require("../controllers/Comments");
const Authentication = require("../middleware/Authentication");
const Trimmer = require("../middleware/Trimmer");

Router.get("/", Users.showHome);
Router.post("/register", Trimmer, Users.register);
Router.post("/login", Trimmer, Users.login);
Router.get("/logout", Users.logout);

Router.get("/wall", Authentication, Posts.showPosts);
Router.post("/post_message", Authentication, Trimmer, Posts.addPost);
Router.post("/delete_post", Authentication, Trimmer, Posts.deletePost);

Router.post("/post_comment", Authentication, Trimmer, Comments.addComment);
Router.post("/delete_comment", Authentication, Trimmer, Comments.deleteComment);

module.exports = Router;