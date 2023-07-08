"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _material = require("@mui/material");

var _sweetalert = _interopRequireDefault(require("sweetalert2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Unauthorized = function Unauthorized() {
  return _sweetalert["default"].fire({
    text: "You are not authorised to view this resource",
    icon: "error",
    animation: true,
    confirmButtonColor: "#0000FF"
  }).then(function () {
    window.location.href = "/dashboard";
  }); // return (
  // 	<div
  // 		style={{
  // 			display: "flex",
  // 			justifyContent: "center",
  // 			alignItems: "center",
  // 			height: "30px",
  // 		}}
  // 		className="mt-3 mb-3"
  // 	>
  // 		<CircularProgress size={50} />
  // 	</div>
  // );
};

var _default = Unauthorized;
exports["default"] = _default;