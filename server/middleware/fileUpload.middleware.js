const multer = require("multer");
const util = require("util");
const path = require("path");

const multerFileUpload = () => {
	const storage = multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, path.join(__dirname, "../public/images"));
		},
		filename: (req, file, cb) => {
			const match = [
				"image/jpg",
				"image/png",
				"image/jpeg",
				"image/gif",
				"image/webp",
			];
			if (match.indexOf(file.mimetype)) {
				const message = `${file.originalname} is invalid. We only accept image files`;
				return cb(message, null);
			}
			const filename = `chap_${new Date().getTime()}`;
			const _file = file.originalname.split(".");
			const fileLength = _file.length;
			const ext = _file[fileLength - 1];
			const name = `${filename}.${ext}`;
			return cb(null, name);
		},
	});

	const fileUpload = multer({
		storage: storage,
		limits: {
			fieldSize: 5 * 1024 * 1024,
		},
	}).fields([
		{
			name: "file",
			maxCount: 5,
		},
	]);
	const promisefyFileUpload = util.promisify(fileUpload);
	const uploadFile = async (req, res, next) => {
		try {
			await promisefyFileUpload(req, res);
			if (!req.files || req.files.length <= 0) {
				return res.status(406).json({ message: "You must sel" });
			}
			next();
		} catch (error) {
			if (error.code === "LIMIT_UNEXPECTED_FILE") {
				return res.status(406).json({ message: "You must " });
			}
			return res
				.status(406)
				.json({ message: "error when trying to upload files" });
		}
	};
	return { uploadFile };
};

module.exports = multerFileUpload;
