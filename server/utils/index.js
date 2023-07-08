const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "30d",
	});
};

const generateHash = (str) => {
	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(str, salt);
	return hash;
};

module.exports = {
	generateHash,
	generateToken,
};
