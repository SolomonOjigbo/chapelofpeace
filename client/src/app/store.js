import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
	key: "root",
	storage,
};

const persistedUser = persistReducer(persistConfig, userReducer);

export const store = configureStore({
	reducer: {
		user: persistedUser,
	},
	middleware: [thunk],
});

export const persistor = persistStore(store);
