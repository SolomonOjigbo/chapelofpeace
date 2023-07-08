const {
	insertBoardOfTrustee,
	getBoardOfTrustee,
	deleteBoardOfTrustee,
	updateBoardOfTrustee,
} = require("../model/boardOfTrustees.model");

const getBoardOfTrusteeService = async (payload) => {
	try {
		const result = await getBoardOfTrustee(payload);
		return result;
	} catch {
		return { data: [], error: true, statusCode: 500, message: "Error" };
	}
};

const insertBoardOfTrusteeService = async (payload) => {
	const result = await insertBoardOfTrustee(payload);
	return result;
};

const deleteBoardOfTrusteeService = async (payload) => {
	try {
		console.log("delete members of council service", payload);
		const result = await deleteBoardOfTrustee(payload);
		return result;
	} catch {
		return { data: [], error: true, statusCode: 500, message: "Error" };
	}
};

const updateBoardOfTrusteeService = async (payload) => {
	try {
		console.log("update board of trustee service", payload);
		const result = await updateBoardOfTrustee(payload);
		return result;
	} catch {
		return { data: [], error: true, statusCode: 500, message: "Error" };
	}
};

module.exports = {
	getBoardOfTrusteeService,
	insertBoardOfTrusteeService,
	deleteBoardOfTrusteeService,
	updateBoardOfTrusteeService,
};
