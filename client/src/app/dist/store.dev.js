"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.persistor = exports.store = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _userSlice = _interopRequireDefault(require("../features/userSlice"));

var _storage = _interopRequireDefault(require("redux-persist/lib/storage"));

var _reduxPersist = require("redux-persist");

var _reduxThunk = _interopRequireDefault(require("redux-thunk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var persistConfig = {
  key: "root",
  storage: _storage["default"]
};
var persistedUser = (0, _reduxPersist.persistReducer)(persistConfig, _userSlice["default"]);
var store = (0, _toolkit.configureStore)({
  reducer: {
    user: persistedUser
  },
  middleware: [_reduxThunk["default"]]
});
exports.store = store;
var persistor = (0, _reduxPersist.persistStore)(store);
exports.persistor = persistor;