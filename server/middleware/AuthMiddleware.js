const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { UserModel } = require("../db/index.js");
// import User from "../Models/UserModel.js";

const protect = asyncHandler(async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try {
			token = req.headers.authorization.split(" ")[1];

			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			req.user = await UserModel.findOne(decoded.id).select("-email");
			// req.user = await UserModel.findOne({ where: { email: decode.email } });
			next();
		} catch (error) {
			console.error(error);
			res.status(401);
			throw new Error("Not authorized, token failed");
		}
	}
	if (!token) {
		res.status(401);
		throw new Error("Not authorized, no token");
	}
});

const admin = (req, res, next) => {
	if (req.user && req.user.role === "Super Admin") {
		next();
	} else {
		res.status(401);
		throw new Error("Not authorized as an Admin");
	}
};
module.exports = { protect, admin };
