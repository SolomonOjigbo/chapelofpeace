const { Op } = require("sequelize");
const { SliderModel } = require("../db");
const { generateHash } = require("../utils");

const insertSlider = async (payload) => {
	try {
		const slider = await SliderModel.create(payload);
		return {
			error: false,
			message: "Slider Data Submitted Successfully",
			statusCode: 201,
			data: slider,
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

const getSlider = async (payload) => {
	try {
		console.log("params", payload);
		const { sortBy, order, limit, cursor } = payload;
		const query =
			cursor === "0"
				? { [Op.gt]: parseInt(cursor) }
				: { [Op.lt]: parseInt(cursor) };
		const result = await SliderModel.findAll({
			limit: parseInt(limit),
			order: [[sortBy, order]],
			where: {
				id: query,
			},
			raw: true,
		});
		console.log("All Slider", result);
		const isEmpty = result.length === 0;
		if (isEmpty) {
			return {
				error: true,
				message: "No more record found",
				statusCode: 404,
				data: null,
			};
		} else {
			return {
				error: false,
				message: "Slider",
				data: result,
				statusCode: 201,
			};
		}
	} catch (error) {
		return {
			error: true,
			message: "Sorry an error occurred, please try again later",
			statusCode: 500,
			data: null,
		};
	}
};

const deleteSlider = async (payload) => {
	try {
		console.log("model params", payload);
		// Find the record to delete
		const record = await SliderModel.findByPk(payload);

		// Check if the record exists
		if (!record) {
			return {
				error: true,
				message: "Record not found",
				data: null,
				statusCode: 404,
			};
		}

		// Delete the record
		await record.destroy();

		return {
			error: false,
			message: "Record deleted successfully",
			data: null,
			statusCode: 200,
		};
	} catch (error) {
		console.log(error.message);
		return {
			error: true,
			message: "Sorry, an error occurred",
			data: null,
			statusCode: 500,
		};
	}
};

const updateSlider = async ({ id, update }) => {
	try {
		console.log("model params", id, update);
		const updatedRecord = await SliderModel.update(update, {
			where: { id },
			raw: true,
		});
		// const updatedData = await SliderModel.findOne({ where: { id } });
		// console.log("record updated>>>>", updatedData);
		if (updatedRecord === null) {
			return {
				error: true,
				message: "Sorry, record does not exist",
				data: null,
				statusCode: 500,
			};
		}
		return {
			error: false,
			message: "Slider Data Updated Successfully",
			statusCode: 201,
			data: updatedRecord,
		};
	} catch (error) {
		console.log(error.message);
		return {
			error: true,
			message: "Sorry, an error occurred",
			data: null,
			statusCode: 500,
		};
	}
};

module.exports = { insertSlider, getSlider, deleteSlider, updateSlider };
