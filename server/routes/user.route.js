const express = require("express");
const {
	getUsersController,
	insertUserController,
	loginUserController,
	deleteUserController,
	updateUserController,
} = require("../controllers/user.controller");
const { protect, admin } = require("../middleware/AuthMiddleware");
// const multerFileUpload = require("../middleware/fileUpload.middleware");

const router = express.Router();
router.get("/users", getUsersController);

router.post("/user", insertUserController);

router.post("/login", loginUserController);

router.delete("/users/:id", deleteUserController);

router.patch("/users/:id", updateUserController);

module.exports = router;
