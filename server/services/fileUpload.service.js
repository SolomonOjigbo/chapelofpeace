const fileUpload = require("../model/fileUpload.model");

const fileUploadService = async (payload) => {
	const result = await fileUpload(payload);
	return result;
};

module.exports = fileUploadService;
