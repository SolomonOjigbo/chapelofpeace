const { Op } = require("sequelize");
const { UserModel } = require("../db");
const { generateToken, generateHash } = require("../utils");
const bcrypt = require("bcryptjs");

const insertUser = async (payload) => {
	try {
		const userEmail = await UserModel.findOne({
			where: { email: payload.email },
		});
		if (userEmail) {
			return {
				error: true,
				message: "Email already exists",
				statusCode: 406,
				user: null,
			};
		}
		const username = await UserModel.findOne({
			where: { username: payload.username },
		});
		if (username) {
			return {
				error: true,
				message: "Username already exists",
				statusCode: 406,
				user: null,
			};
		}
		const hashPassword = generateHash(payload.password);
		payload.password = hashPassword;
		const user = await UserModel.create(payload);
		const { password, ...rest } = user.toJSON();
		return {
			error: false,
			message: "Account Created Successfully",
			statusCode: 201,
			token: generateToken(user.id),
			user: rest,
		};
	} catch (error) {
		return {
			error: true,
			message: `${error.message}`,
			statusCode: 500,
			user: null,
		};
	}
};

const getUsers = async (payload) => {
	try {
		console.log("params", payload);
		const { sortBy, order, limit, cursor } = payload;
		const query =
			cursor === "0"
				? { [Op.gt]: parseInt(cursor) }
				: { [Op.lt]: parseInt(cursor) };
		const result = await UserModel.findAll({
			limit: parseInt(limit),
			order: [[sortBy, order]],
			where: {
				id: query,
			},
			raw: true,
		});
		console.log("All Users", result);
		const isEmpty = result.length === 0;
		if (isEmpty) {
			return {
				error: true,
				message: "No more record found",
				statusCode: 404,
				users: null,
			};
		} else {
			return {
				error: false,
				message: "Users",
				users: result,
				statusCode: 201,
			};
		}
	} catch (error) {
		return {
			error: true,
			message: "Sorry an error occured",
			statusCode: 500,
			users: null,
		};
	}
};

const loginUser = async (payload) => {
	try {
		// const device = req.headers["user-agent"];
		// const ip = req.ip;
		const { email, password } = payload;
		const user = await UserModel.findOne({ where: { email: payload.email } });
		if (!user) {
			return {
				error: true,
				message: "Wrong email/password provided",
				statusCode: 500,
				user: null,
			};
		}
		const checker = bcrypt.compareSync(password, user.password); // true
		if (!checker) {
			return {
				error: true,
				message: "Wrong email/password provided",
				statusCode: 500,
				user: null,
			};
		}
		console.log("user>>>", user);
		const currentUser = {
			id: user.id,
			email: user.email,
			username: user.username,
			name: user.name,
			role: user.role,
			photo: user.photo,
			uuid: user.uuid,
		};
		return {
			error: false,
			message: "Query Successfully",
			statusCode: 201,
			user: currentUser,
			token: generateToken(currentUser.id),
		};
	} catch (error) {
		console.log("Login error>>>", error.message);
		return {
			error: true,
			message: "Sorry an error occured",
			statusCode: 500,
			user: null,
		};
	}
};

const deleteUser = async (payload) => {
	try {
		console.log("model params", payload);
		// Find the record to delete
		const record = await UserModel.findByPk(payload);

		// Check if the record exists
		if (!record) {
			return {
				error: true,
				message: "Record not found",
				user: null,
				statusCode: 404,
			};
		}

		// Delete the record
		await record.destroy();

		return {
			error: false,
			message: "Record deleted successfully",
			user: null,
			statusCode: 200,
		};
	} catch (error) {
		console.log(error.message);
		return {
			error: true,
			message: "Sorry, an error occurred",
			user: null,
			statusCode: 500,
		};
	}
};

const updateUser = async ({ id, update }) => {
	try {
		console.log("model params", id, update);
		const updatedRecord = await UserModel.update(update, {
			where: { id },
			returning: true,
		});
		const updatedData = await UserModel.findOne({ where: { id } });
		console.log("record updated>>>>", updatedData);
		if (updatedData === null) {
			return {
				error: true,
				message: "Sorry, record does not exist",
				user: null,
				statusCode: 500,
			};
		}
		return {
			error: false,
			message: "User user Updated Successfully",
			statusCode: 201,
			user: updatedData,
		};
	} catch (error) {
		console.log(error.message);
		return {
			error: true,
			message: "Sorry, an error occurred",
			user: null,
			statusCode: 500,
		};
	}
};

module.exports = { insertUser, getUsers, loginUser, deleteUser, updateUser };
