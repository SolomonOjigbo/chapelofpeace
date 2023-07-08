const {
	getSliderService,
	insertSliderService,
	deleteSliderService,
	updateSliderService,
} = require("../services/slider.service");

const getSliderController = async (req, res) => {
	const result = await getSliderService(req.query);
	res.status(result.statusCode).json(result);
};

const insertSliderController = async (req, res) => {
	let body = {
		title: req.body.title,
		description: req.body.name,
		page: req.body.page,
		photo: req.body.photo,
	};
	console.log("req.body>>>>", body);

	const result = await insertSliderService(body);
	res.status(result.statusCode).json(result);
};

const deleteSliderController = async (req, res) => {
	console.log("req", req.params);
	const result = await deleteSliderService(req.params.id);
	console.log("result", result);
	res.status(result.statusCode).json(result);
};

const updateSliderController = async (req, res) => {
	console.log("req.body>>>>", req.body);
	console.log("req.params.id>>>>", req.params.id);
	const id = req.params.id;
	const update = req.body;
	const result = await updateSliderService({ id, update });
	console.log("result", result);
	res.status(result.statusCode).json(result);
};

module.exports = {
	getSliderController,
	insertSliderController,
	deleteSliderController,
	updateSliderController,
};
