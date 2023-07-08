// import { LOGIN_USER, UPDATE_PROFILE } from '../../actions/actions.auth'
import Axios from "../../config";
import { getErrorMessage } from "../../utils";
import useSWR from "swr";

export const registerUser = async (body, dispatch) => {
	try {
		const { data } = await Axios.post("/users/register", body);
		// dispatch({type:LOGIN_USER, payload:data})
		return { error: false, data, msg: "Registration Successful" };
	} catch (error) {
		return { error: true, data: {}, msg: getErrorMessage(error) };
	}
};

export const logout = async () => {
	try {
		// if (localStorage.getItem("_c_user")) {
		// 	const user = localStorage.getItem("_c_user");
		// 	if (!user) return null;
		// 	// const _user = JSON.parse(user)
		// 	// await Axios.patch('/users/logout', { refreshToken: _user.refreshToken })
		// }
		localStorage.clear();
		// localStorage.removeItem("_c_user");
		// localStorage.removeItem("token");
		window.location.href = "/login";
	} catch (error) {}
};

export const checkAuthUser = () => {
	const user = localStorage.getItem("_c_user");
	if (!user) return null;
	return user;
};

export const changePassword = async (body) => {
	try {
		const { data } = await Axios.patch("/users/update_password", body);
		return { error: false, data, msg: data.message };
	} catch (error) {
		return { error: true, data: {}, msg: getErrorMessage(error) };
	}
};

export const updateDetails = async (dispatch, body) => {
	try {
		const { data } = await Axios.patch("/users/update_details", body);
		// dispatch({ type: UPDATE_PROFILE, payload: body })
		return { error: false, data, msg: data.message };
	} catch (error) {
		return { error: true, data: {}, msg: getErrorMessage(error) };
	}
};

export const editUser = async (body) => {
	try {
		const { data } = await Axios.patch("/users/edit_user", body);
		return { error: false, data, msg: data.message };
	} catch (error) {
		return { error: true, data: {}, msg: getErrorMessage(error) };
	}
};

export const updateUser = async (body) => {
	try {
		const { data } = await Axios.patch("/users/update_password", body);
		return { error: false, data, msg: data.message };
	} catch (error) {
		return { error: true, data: {}, msg: getErrorMessage(error) };
	}
};

export const getCurrentUserSession = async () => {
	const user = checkAuthUser();
	if (!user) {
		throw new Error("Authentication is required", {
			cause: "User is null",
			status: 403,
		});
	}
	return user;
};

export const getSuperAdminUser = async () => {
	const user = checkAuthUser();
	const superAdmin = user.role === "Super Admin";
	if (!superAdmin) return null;
	return superAdmin;
};

export const useUserAuth = () => {
	const { user, isError, loading, mutate } = useSWR(
		"/api/login",
		getCurrentUserSession
	);
	return { user, isError, loading, mutate };
};
