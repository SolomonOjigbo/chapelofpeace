"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SuperAdmin = void 0;

var _sweetalert = _interopRequireDefault(require("sweetalert2"));

var _reactRedux = require("react-redux");

var _userSlice = require("./features/userSlice");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var SuperAdmin = function SuperAdmin(_ref) {
  var children = _ref.children;
  var userData = (0, _reactRedux.useSelector)(_userSlice.selectUser);
  var user = userData.user;
  console.log(user);

  if (user.role !== "Super Admin") {
    return _sweetalert["default"].fire("You are not authorised to view this resource");
  }

  return children;
};

exports.SuperAdmin = SuperAdmin;