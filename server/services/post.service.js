const {
	insertPost,
	getPost,
	deletePost,
	updatePost,
	getSinglePost,
} = require("../model/post.model");

const getPostService = async (payload) => {
	try {
		const result = await getPost(payload);
		return result;
	} catch {
		return { data: [], error: true, statusCode: 500, message: "Error" };
	}
};

const getSinglePostService = async (payload) => {
	try {
		const result = await getSinglePost(payload);
		return result;
	} catch {
		return { data: [], error: true, statusCode: 500, message: "Error" };
	}
};

const insertPostService = async (payload) => {
	const result = await insertPost(payload);
	return result;
};

const deletePostService = async (payload) => {
	try {
		console.log("delete post service", payload);
		const result = await deletePost(payload);
		return result;
	} catch {
		return { data: [], error: true, statusCode: 500, message: "Error" };
	}
};

const updatePostService = async (payload) => {
	try {
		console.log("update post service", payload);
		const result = await updatePost(payload);
		return result;
	} catch {
		return { data: [], error: true, statusCode: 500, message: "Error" };
	}
};

module.exports = {
	getPostService,
	insertPostService,
	deletePostService,
	updatePostService,
	getSinglePostService,
};
