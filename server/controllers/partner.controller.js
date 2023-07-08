const {
	getPartnerService,
	insertPartnerService,
	updatePartnerService,
	deletePartnerService,
} = require("../services/partner.service");

const getPartnerController = async (req, res) => {
	const result = await getPartnerService(req.query);
	res.status(result.statusCode).json(result);
};

const insertPartnerController = async (req, res) => {
	console.log("req.body>>>>", req.body);
	const result = await insertPartnerService(req.body);
	res.status(result.statusCode).json(result);
};

const deletePartnerController = async (req, res) => {
	console.log("req", req.params);
	const result = await deletePartnerService(req.params.id);
	console.log("result", result);
	res.status(result.statusCode).json(result);
};

const updatePartnerController = async (req, res) => {
	console.log("req.body>>>>", req.body);
	console.log("req.params.id>>>>", req.params.id);
	const id = req.params.id;
	const update = req.body;
	const result = await updatePartnerService({ id, update });
	console.log("result", result);
	res.status(result.statusCode).json(result);
};

module.exports = {
	getPartnerController,
	insertPartnerController,
	deletePartnerController,
	updatePartnerController,
};
