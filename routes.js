const Express = require("express");
const Router = Express.Router();
const Users = require("./controllers/Users");
const Posts = require("./controllers/Posts");
const Comments = require("./controllers/Comments");

Router.get("/", Users.showHome);
Router.post("/register", Users.register);
Router.post("/login", Users.login);
Router.get("/logout", Users.logout);

Router.get("/wall", Posts.showPosts);
Router.post("/post_message", Posts.addPost);
Router.post("/delete_post", Posts.deletePost);

Router.post("/post_comment", Comments.addComment);
Router.post("/delete_comment", Comments.deleteComment);

module.exports = Router;