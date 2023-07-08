import Axios from "../../config";

export const getUsersSWRCursor = async ({
	limit,
	cursor = 0,
	sortBy = "id",
	order = "desc",
}) => {
	try {
		console.log(limit, cursor);
		const query = `sortBy=${sortBy}&order=${order}&limit=${limit}&cursor=${cursor}`;
		const response = await Axios.get(`/users?${query}`);
		console.log("response", response.data);
		const data = response.data.users;
		const nextCursor = data[data.length - 1].id;
		console.log(nextCursor);
		return { data, nextCursor };
	} catch (error) {
		throw error;
	}
};
