const express = require("express");
// const fileUploadController = require("../controllers/fileUpload.controller");

const router = express.Router();

const multerFileUpload = require("../middleware/fileUpload.middleware.js");

// const storage = multer.diskStorage({
// 	destination: function (req, file, cb) {
// 		cb(null, "../public/images");
// 	},
// 	filename: function (req, file, cb) {
// 		cb(null, Date.now() + file.originalname);
// 	},
// });

// const upload = multer({ storage });

// router.post("/upload-files", upload.single("file"), function (req, res) {
// 	const file = req.file;
// 	res.status(200).json(file.filename);
// 	console.log(file);
// });

router.post("/upload-files", multerFileUpload, function (req, res) {
	const file = req.file;
	res.status(200).json(file.filename);
	console.log(file);
});

module.exports = router;
