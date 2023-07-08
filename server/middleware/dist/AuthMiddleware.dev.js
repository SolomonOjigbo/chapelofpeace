"use strict";

var jwt = require("jsonwebtoken");

var asyncHandler = require("express-async-handler");

var _require = require("../db/index.js"),
    UserModel = _require.UserModel; // import User from "../Models/UserModel.js";


var protect = asyncHandler(function _callee(req, res, next) {
  var token, decoded;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!(req.headers.authorization && req.headers.authorization.startsWith("Bearer"))) {
            _context.next = 15;
            break;
          }

          _context.prev = 1;
          token = req.headers.authorization.split(" ")[1];
          decoded = jwt.verify(token, process.env.JWT_SECRET);
          _context.next = 6;
          return regeneratorRuntime.awrap(UserModel.findOne(decoded.id).select("-email"));

        case 6:
          req.user = _context.sent;
          // req.user = await UserModel.findOne({ where: { email: decode.email } });
          next();
          _context.next = 15;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](1);
          console.error(_context.t0);
          res.status(401);
          throw new Error("Not authorized, token failed");

        case 15:
          if (token) {
            _context.next = 18;
            break;
          }

          res.status(401);
          throw new Error("Not authorized, no token");

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 10]]);
});

var admin = function admin(req, res, next) {
  if (req.user && req.user.role === "Super Admin") {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an Admin");
  }
};

module.exports = {
  protect: protect,
  admin: admin
};