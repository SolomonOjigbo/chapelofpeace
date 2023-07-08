"use strict";

var _require = require("../model/boardOfTrustees.model"),
    insertBoardOfTrustee = _require.insertBoardOfTrustee,
    getBoardOfTrustee = _require.getBoardOfTrustee,
    deleteBoardOfTrustee = _require.deleteBoardOfTrustee,
    updateBoardOfTrustee = _require.updateBoardOfTrustee;

var getBoardOfTrusteeService = function getBoardOfTrusteeService(payload) {
  var result;
  return regeneratorRuntime.async(function getBoardOfTrusteeService$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(getBoardOfTrustee(payload));

        case 3:
          result = _context.sent;
          return _context.abrupt("return", result);

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", {
            data: [],
            error: true,
            statusCode: 500,
            message: "Error"
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

var insertBoardOfTrusteeService = function insertBoardOfTrusteeService(payload) {
  var result;
  return regeneratorRuntime.async(function insertBoardOfTrusteeService$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(insertBoardOfTrustee(payload));

        case 2:
          result = _context2.sent;
          return _context2.abrupt("return", result);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var deleteBoardOfTrusteeService = function deleteBoardOfTrusteeService(payload) {
  var result;
  return regeneratorRuntime.async(function deleteBoardOfTrusteeService$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          console.log("delete members of council service", payload);
          _context3.next = 4;
          return regeneratorRuntime.awrap(deleteBoardOfTrustee(payload));

        case 4:
          result = _context3.sent;
          return _context3.abrupt("return", result);

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          return _context3.abrupt("return", {
            data: [],
            error: true,
            statusCode: 500,
            message: "Error"
          });

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

var updateBoardOfTrusteeService = function updateBoardOfTrusteeService(payload) {
  var result;
  return regeneratorRuntime.async(function updateBoardOfTrusteeService$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          console.log("update board of trustee service", payload);
          _context4.next = 4;
          return regeneratorRuntime.awrap(updateBoardOfTrustee(payload));

        case 4:
          result = _context4.sent;
          return _context4.abrupt("return", result);

        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          return _context4.abrupt("return", {
            data: [],
            error: true,
            statusCode: 500,
            message: "Error"
          });

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

module.exports = {
  getBoardOfTrusteeService: getBoardOfTrusteeService,
  insertBoardOfTrusteeService: insertBoardOfTrusteeService,
  deleteBoardOfTrusteeService: deleteBoardOfTrusteeService,
  updateBoardOfTrusteeService: updateBoardOfTrusteeService
};