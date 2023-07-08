const { Op } = require("sequelize");
const { TestimonialsModel } = require("../db");
const { generateHash } = require("../utils");

const insertTestimonial = async (payload) => {
	try {
		const testimonial = await TestimonialsModel.create(payload);
		return {
			error: false,
			message: "Testimonial Data Submitted Successfully",
			statusCode: 201,
			data: testimonial,
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

const getTestimonial = async (payload) => {
	try {
		console.log("params", payload);
		const { sortBy, order, limit, cursor } = payload;
		const query =
			cursor === "0"
				? { [Op.gt]: parseInt(cursor) }
				: { [Op.lt]: parseInt(cursor) };
		const result = await TestimonialsModel.findAll({
			limit: parseInt(limit),
			order: [[sortBy, order]],
			where: {
				id: query,
			},
			raw: true,
		});
		console.log("All Testimonial", result);
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
				message: "Testimonial",
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

const deleteTestimonial = async (payload) => {
	try {
		console.log("model params", payload);
		// Find the record to delete
		const record = await TestimonialsModel.findByPk(payload);

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

const updateTestimonial = async ({ id, update }) => {
	try {
		console.log("model params", id, update);
		const updatedRecord = await TestimonialsModel.update(update, {
			where: { id },
			returning: true,
		});
		const updatedData = await TestimonialsModel.findOne({ where: { id } });
		console.log("record updated>>>>", updatedData);
		if (updatedData === null) {
			return {
				error: true,
				message: "Sorry, record does not exist",
				data: null,
				statusCode: 500,
			};
		}
		return {
			error: false,
			message: "Testimonial Data Updated Successfully",
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

module.exports = {
	insertTestimonial,
	getTestimonial,
	deleteTestimonial,
	updateTestimonial,
};
