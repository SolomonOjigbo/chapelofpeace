const {
	getPostService,
	insertPostService,
	deletePostService,
	updatePostService,
	getSinglePostService,
} = require("../services/post.service");

const getPostController = async (req, res) => {
	const result = await getPostService(req.query);
	res.status(result.statusCode).json(result);
};

const insertPostController = async (req, res) => {
	let post = {
		title: req.body.title,
		content: req.body.content,
		description: req.body.description,
		photo: req.body.photo,
		name: req.body.name,
	};
	const result = await insertPostService(post);
	res.status(result.statusCode).json(result);
};

const deletePostController = async (req, res) => {
	console.log("req", req.params);
	const result = await deletePostService(req.params.id);
	console.log("result", result);
	res.status(result.statusCode).json(result);
};

const getSinglePostController = async (req, res) => {
	// const { id } = req.params;
	// console.log(req.params);
	const result = await getSinglePostService(req.params.id);
	// console.log("result", result);
	res.status(result.statusCode).json(result);
};

const updatePostController = async (req, res) => {
	console.log("req.body>>>>", req.body);
	console.log("req.params.id>>>>", req.params.id);
	const id = req.params.id;
	let post = {
		photo: req.body.photo,
		title: req.body.title,
		name: req.body.name,
		description: req.body.description,
		content: req.body.content,
	};
	const result = await updatePostService({ id, post });
	console.log("result", result);
	res.status(result.statusCode).json(result);
};

module.exports = {
	getPostController,
	insertPostController,
	deletePostController,
	updatePostController,
	getSinglePostController,
};
