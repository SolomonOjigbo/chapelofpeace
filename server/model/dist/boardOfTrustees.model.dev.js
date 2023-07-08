"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require("sequelize"),
    Op = _require.Op;

var _require2 = require("../db"),
    BoardOfTrusteeModel = _require2.BoardOfTrusteeModel;

var _require3 = require("../utils"),
    generateHash = _require3.generateHash;

var insertBoardOfTrustee = function insertBoardOfTrustee(payload) {
  var boardofTrustees;
  return regeneratorRuntime.async(function insertBoardOfTrustee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(BoardOfTrusteeModel.create(payload));

        case 3:
          boardofTrustees = _context.sent;
          return _context.abrupt("return", {
            error: false,
            message: "Board of Trustee Data Submitted Successfully",
            statusCode: 201,
            data: boardofTrustees
          });

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", {
            error: true,
            message: "Sorry an error occurred, please try again later",
            statusCode: 500,
            data: null
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

var getBoardOfTrustee = function getBoardOfTrustee(payload) {
  var sortBy, order, limit, cursor, query, result, isEmpty;
  return regeneratorRuntime.async(function getBoardOfTrustee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          console.log("params", payload);
          sortBy = payload.sortBy, order = payload.order, limit = payload.limit, cursor = payload.cursor;
          query = cursor === "0" ? _defineProperty({}, Op.gt, parseInt(cursor)) : _defineProperty({}, Op.lt, parseInt(cursor));
          _context2.next = 6;
          return regeneratorRuntime.awrap(BoardOfTrusteeModel.findAll({
            limit: parseInt(limit),
            order: [[sortBy, order]],
            where: {
              id: query
            },
            raw: true
          }));

        case 6:
          result = _context2.sent;
          console.log("All Members Of Council", result);
          isEmpty = result.length === 0;

          if (!isEmpty) {
            _context2.next = 13;
            break;
          }

          return _context2.abrupt("return", {
            error: true,
            message: "No more record found",
            statusCode: 404,
            data: null
          });

        case 13:
          return _context2.abrupt("return", {
            error: false,
            message: "Members Of Council",
            data: result,
            statusCode: 201
          });

        case 14:
          _context2.next = 19;
          break;

        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", {
            error: true,
            message: "Sorry an error occurred, please try again later",
            statusCode: 500,
            data: null
          });

        case 19:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 16]]);
};

var deleteBoardOfTrustee = function deleteBoardOfTrustee(payload) {
  var record;
  return regeneratorRuntime.async(function deleteBoardOfTrustee$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          console.log("model params", payload); // Find the record to delete

          _context3.next = 4;
          return regeneratorRuntime.awrap(BoardOfTrusteeModel.findByPk(payload));

        case 4:
          record = _context3.sent;

          if (record) {
            _context3.next = 7;
            break;
          }

          return _context3.abrupt("return", {
            error: true,
            message: "Record not found",
            data: null,
            statusCode: 404
          });

        case 7:
          _context3.next = 9;
          return regeneratorRuntime.awrap(record.destroy());

        case 9:
          return _context3.abrupt("return", {
            error: false,
            message: "Record deleted successfully",
            data: null,
            statusCode: 200
          });

        case 12:
          _context3.prev = 12;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0.message);
          return _context3.abrupt("return", {
            error: true,
            message: "Sorry, an error occurred",
            data: null,
            statusCode: 500
          });

        case 16:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 12]]);
};

var updateBoardOfTrustee = function updateBoardOfTrustee(_ref3) {
  var id, update, updatedRecord, updatedData;
  return regeneratorRuntime.async(function updateBoardOfTrustee$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id = _ref3.id, update = _ref3.update;
          _context4.prev = 1;
          console.log("model params", id, update);
          _context4.next = 5;
          return regeneratorRuntime.awrap(BoardOfTrusteeModel.update(update, {
            where: {
              id: id
            },
            returning: true
          }));

        case 5:
          updatedRecord = _context4.sent;
          _context4.next = 8;
          return regeneratorRuntime.awrap(BoardOfTrusteeModel.findOne({
            where: {
              id: id
            }
          }));

        case 8:
          updatedData = _context4.sent;
          console.log("record updated>>>>", updatedData);

          if (!(updatedData === null)) {
            _context4.next = 12;
            break;
          }

          return _context4.abrupt("return", {
            error: true,
            message: "Sorry, record does not exist",
            data: null,
            statusCode: 500
          });

        case 12:
          return _context4.abrupt("return", {
            error: false,
            message: "Member of Council Updated Successfully",
            statusCode: 201,
            data: updatedData
          });

        case 15:
          _context4.prev = 15;
          _context4.t0 = _context4["catch"](1);
          console.log(_context4.t0.message);
          return _context4.abrupt("return", {
            error: true,
            message: "Sorry, an error occurred",
            data: null,
            statusCode: 500
          });

        case 19:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 15]]);
};

module.exports = {
  insertBoardOfTrustee: insertBoardOfTrustee,
  getBoardOfTrustee: getBoardOfTrustee,
  deleteBoardOfTrustee: deleteBoardOfTrustee,
  updateBoardOfTrustee: updateBoardOfTrustee
};