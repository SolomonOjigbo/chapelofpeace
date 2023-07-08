const {
	getBoardOfTrusteeService,
	insertBoardOfTrusteeService,
	deleteBoardOfTrusteeService,
	updateBoardOfTrusteeService,
} = require("../services/boardOfTrustees.service");

const getBoardOfTrusteeController = async (req, res) => {
	const result = await getBoardOfTrusteeService(req.query);
	res.status(result.statusCode).json(result);
};

const insertBoardOfTrusteeController = async (req, res) => {
	console.log("req.body>>>>", req.body);
	const result = await insertBoardOfTrusteeService(req.body);
	res.status(result.statusCode).json(result);
};

const deleteBoardOfTrusteeController = async (req, res) => {
	console.log("req", req.params);
	const result = await deleteBoardOfTrusteeService(req.params.id);
	console.log("result", result);
	res.status(result.statusCode).json(result);
};

const updateBoardOfTrusteeController = async (req, res) => {
	console.log("req.body>>>>", req.body);
	console.log("req.params.id>>>>", req.params.id);
	const id = req.params.id;
	const update = req.body;
	const result = await updateBoardOfTrusteeService({ id, update });
	console.log("result", result);
	res.status(result.statusCode).json(result);
};

module.exports = {
	getBoardOfTrusteeController,
	insertBoardOfTrusteeController,
	deleteBoardOfTrusteeController,
	updateBoardOfTrusteeController,
};
