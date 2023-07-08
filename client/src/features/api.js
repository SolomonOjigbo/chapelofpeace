import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios, { SERVER_URL } from "../config";

export const getUser = createAsyncThunk(
	"user/getUser",
	async (data, thunkApi) => {
		try {
			const response = await Axios.post("/login", data);
			console.log(response.data);
			return response.data;
		} catch (error) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
);
