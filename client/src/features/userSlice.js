import { getUser } from "./api";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	loading: false,
	error: null,
	user: null,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getUser.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(getUser.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload;
			})
			.addCase(getUser.rejected, (state, action) => {
				state.error = action.payload;
			});
	},
});

export const selectUser = (state) => state.user;

export default userSlice.reducer;
