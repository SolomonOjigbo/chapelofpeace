const fileUploadService = require("../services/fileUpload.service");

const fileUploadController = async (req, res) => {
	const file = req.file;
	const result = await fileUploadService(file);
	res.status(result.statusCode).json(result);
};

module.exports = fileUploadController;
