"use strict";

var express = require("express");

var _require = require("../controllers/boardOfTrustees.controller"),
    getBoardOfTrusteeController = _require.getBoardOfTrusteeController,
    insertBoardOfTrusteeController = _require.insertBoardOfTrusteeController,
    deleteBoardOfTrusteeController = _require.deleteBoardOfTrusteeController,
    updateBoardOfTrusteeController = _require.updateBoardOfTrusteeController;

var router = express.Router();
router.get("/board-of-trustees", getBoardOfTrusteeController);
router.post("/board-of-trustees", insertBoardOfTrusteeController);
router["delete"]("/board-of-trustees/:id", deleteBoardOfTrusteeController);
router.patch("/board-of-trustees/:id", updateBoardOfTrusteeController);
module.exports = router;