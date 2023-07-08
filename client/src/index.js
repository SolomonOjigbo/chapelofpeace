import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import BackToTopButton from "./components/BackToTopButton";

import { BrowserRouter } from "react-router-dom";
import "swiper/css/bundle";
import { persistor, store } from "./app/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<App />
				</PersistGate>
				<BackToTopButton />
			</Provider>
		</BrowserRouter>
	</React.StrictMode>
);
