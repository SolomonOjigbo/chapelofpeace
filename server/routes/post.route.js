const express = require("express");
const {
	getPostController,
	insertPostController,
	deletePostController,
	updatePostController,
	getSinglePostController,
} = require("../controllers/post.controller");
// const multerFileUpload = require("../middleware/fileUpload.middleware");

const router = express.Router();
router.get("/posts", getPostController);

router.get("/post/:id", getSinglePostController);

router.post("/post", insertPostController);

router.delete("/post/:id", deletePostController);

router.patch("/post/:id", updatePostController);

module.exports = router;
