const express = require("express");
const {
	getBoardOfTrusteeController,
	insertBoardOfTrusteeController,
	deleteBoardOfTrusteeController,
	updateBoardOfTrusteeController,
} = require("../controllers/boardOfTrustees.controller");

const router = express.Router();
router.get("/board-of-trustees", getBoardOfTrusteeController);

router.post("/board-of-trustees", insertBoardOfTrusteeController);

router.delete("/board-of-trustees/:id", deleteBoardOfTrusteeController);

router.patch("/board-of-trustees/:id", updateBoardOfTrusteeController);

module.exports = router;
