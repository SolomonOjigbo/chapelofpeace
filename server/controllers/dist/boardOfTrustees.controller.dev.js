"use strict";

var _require = require("../services/boardOfTrustees.service"),
    getBoardOfTrusteeService = _require.getBoardOfTrusteeService,
    insertBoardOfTrusteeService = _require.insertBoardOfTrusteeService,
    deleteBoardOfTrusteeService = _require.deleteBoardOfTrusteeService,
    updateBoardOfTrusteeService = _require.updateBoardOfTrusteeService;

var getBoardOfTrusteeController = function getBoardOfTrusteeController(req, res) {
  var result;
  return regeneratorRuntime.async(function getBoardOfTrusteeController$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(getBoardOfTrusteeService(req.query));

        case 2:
          result = _context.sent;
          res.status(result.statusCode).json(result);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

var insertBoardOfTrusteeController = function insertBoardOfTrusteeController(req, res) {
  var result;
  return regeneratorRuntime.async(function insertBoardOfTrusteeController$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          console.log("req.body>>>>", req.body);
          _context2.next = 3;
          return regeneratorRuntime.awrap(insertBoardOfTrusteeService(req.body));

        case 3:
          result = _context2.sent;
          res.status(result.statusCode).json(result);

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var deleteBoardOfTrusteeController = function deleteBoardOfTrusteeController(req, res) {
  var result;
  return regeneratorRuntime.async(function deleteBoardOfTrusteeController$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          console.log("req", req.params);
          _context3.next = 3;
          return regeneratorRuntime.awrap(deleteBoardOfTrusteeService(req.params.id));

        case 3:
          result = _context3.sent;
          console.log("result", result);
          res.status(result.statusCode).json(result);

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  });
};

var updateBoardOfTrusteeController = function updateBoardOfTrusteeController(req, res) {
  var id, update, result;
  return regeneratorRuntime.async(function updateBoardOfTrusteeController$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          console.log("req.body>>>>", req.body);
          console.log("req.params.id>>>>", req.params.id);
          id = req.params.id;
          update = req.body;
          _context4.next = 6;
          return regeneratorRuntime.awrap(updateBoardOfTrusteeService({
            id: id,
            update: update
          }));

        case 6:
          result = _context4.sent;
          console.log("result", result);
          res.status(result.statusCode).json(result);

        case 9:
        case "end":
          return _context4.stop();
      }
    }
  });
};

module.exports = {
  getBoardOfTrusteeController: getBoardOfTrusteeController,
  insertBoardOfTrusteeController: insertBoardOfTrusteeController,
  deleteBoardOfTrusteeController: deleteBoardOfTrusteeController,
  updateBoardOfTrusteeController: updateBoardOfTrusteeController
};