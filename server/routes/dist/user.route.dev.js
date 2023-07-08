"use strict";

var express = require("express");

var _require = require("../controllers/user.controller"),
    getUsersController = _require.getUsersController,
    insertUserController = _require.insertUserController,
    loginUserController = _require.loginUserController,
    deleteUserController = _require.deleteUserController,
    updateUserController = _require.updateUserController;

var _require2 = require("../middleware/AuthMiddleware"),
    protect = _require2.protect,
    admin = _require2.admin; // const multerFileUpload = require("../middleware/fileUpload.middleware");


var router = express.Router();
router.get("/users", getUsersController);
router.post("/user", insertUserController);
router.post("/login", loginUserController);
router["delete"]("/users/:id", deleteUserController);
router.patch("/users/:id", updateUserController);
module.exports = router;