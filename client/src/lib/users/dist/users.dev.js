"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUsersSWRCursor = void 0;

var _config = _interopRequireDefault(require("../../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getUsersSWRCursor = function getUsersSWRCursor(_ref) {
  var limit, _ref$cursor, cursor, _ref$sortBy, sortBy, _ref$order, order, query, response, data, nextCursor;

  return regeneratorRuntime.async(function getUsersSWRCursor$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          limit = _ref.limit, _ref$cursor = _ref.cursor, cursor = _ref$cursor === void 0 ? 0 : _ref$cursor, _ref$sortBy = _ref.sortBy, sortBy = _ref$sortBy === void 0 ? "id" : _ref$sortBy, _ref$order = _ref.order, order = _ref$order === void 0 ? "desc" : _ref$order;
          _context.prev = 1;
          console.log(limit, cursor);
          query = "sortBy=".concat(sortBy, "&order=").concat(order, "&limit=").concat(limit, "&cursor=").concat(cursor);
          _context.next = 6;
          return regeneratorRuntime.awrap(_config["default"].get("/users?".concat(query)));

        case 6:
          response = _context.sent;
          console.log("response", response.data);
          data = response.data.users;
          nextCursor = data[data.length - 1].id;
          console.log(nextCursor);
          return _context.abrupt("return", {
            data: data,
            nextCursor: nextCursor
          });

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](1);
          throw _context.t0;

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 14]]);
};

exports.getUsersSWRCursor = getUsersSWRCursor;