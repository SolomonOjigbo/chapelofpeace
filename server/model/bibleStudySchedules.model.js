const { Op } = require("sequelize");
const { BibleStudyScheduleModel } = require("../db");
const { generateHash } = require("../utils");

const insertBibleStudySchedules = async (payload) => {
	try {
		const venue = await BibleStudyScheduleModel.findOne({
			where: { venue: payload.date },
		});
		if (venue) {
			return {
				error: true,
				message: "Schedule already exists",
				statusCode: 406,
				data: null,
			};
		}
		const bibleStudySchedules = await BibleStudyScheduleModel.create(payload);
		return {
			error: false,
			message: "Bible Study Created Successfully",
			statusCode: 201,
			data: bibleStudySchedules,
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

const getBibleStudySchedules = async (payload) => {
	try {
		console.log("params", payload);
		const { sortBy, order, limit, cursor } = payload;
		const query =
			cursor === "0"
				? { [Op.gt]: parseInt(cursor) }
				: { [Op.lt]: parseInt(cursor) };
		const result = await BibleStudyScheduleModel.findAll({
			limit: parseInt(limit),
			order: [[sortBy, order]],
			where: {
				id: query,
			},
			raw: true,
		});
		console.log("All Bible Study Schedules", result);
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
				message: "Bible Study Schedules",
				data: result,
				statusCode: 201,
			};
		}
	} catch (error) {
		console.log(error);
		return {
			error: true,
			message: "Sorry an error occurred, please try again later",
			statusCode: 500,
			data: null,
		};
	}
};

const deleteBibleStudySchedules = async (payload) => {
	try {
		console.log("model params", payload);
		// Find the record to delete
		const record = await BibleStudyScheduleModel.findByPk(payload);

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

const updateBibleStudySchedules = async ({ id, update }) => {
	try {
		console.log("model params", id, update);
		const updatedRecord = await BibleStudyScheduleModel.update(update, {
			where: { id },
			returning: true,
		});
		const updatedData = await BibleStudyScheduleModel.findOne({
			where: { id },
		});
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
			message: "Bible Study Schedule Updated Successfully",
			statusCode: 201,
			data: updatedData,
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
	insertBibleStudySchedules,
	getBibleStudySchedules,
	deleteBibleStudySchedules,
	updateBibleStudySchedules,
};
