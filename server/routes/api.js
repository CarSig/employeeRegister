const express = require("express");
const router = express.Router();

const userController = require("./userController");
const commentController = require("./commentController");

router.post("/register", userController.register);
router.post("/login", userController.login);

router.get("/users", userController.findAllUsers);
router.get("/users/:id", userController.findOneUser);
router.delete("/users/:id", userController.deleteUser);
router.put("/users/:id", userController.update);

router.get("/comments", commentController.getAllPosts);
router.post("/comment", commentController.postComment);

module.exports = router;
