const fileUpload = (payload) => {
	try {
		const file = payload;
		return {
			error: false,
			message: "File Submitted Successfully",
			statusCode: 201,
			data: file,
		};
	} catch (error) {
		return {
			error: true,
			message: "Sorry an error occurred, please try again later",
			statusCode: 500,
			data: null,
		};
	}
};

module.exports = fileUpload;
