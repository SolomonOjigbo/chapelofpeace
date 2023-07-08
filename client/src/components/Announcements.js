import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import Loader from "../admin/components/Loader";
import { getAlumniSWRCursor } from "../lib/alumni";
import useSWRInfinite from "swr/infinite";

const Announcements = () => {
	const PAGE_SIZE = 5;
	const getKey = (pageIndex, previousPageData) => {
		//if no user or reached the end, do not fetch
		if (previousPageData && !previousPageData.data) return null;

		//first page, we do not
		if (pageIndex === 0)
			return { path: "/alumni-announcements", cursor: 0, limit: PAGE_SIZE };

		//add the cursor to the API e
		console.log(previousPageData.nextCursor);
		return {
			path: "/alumni-announcements",
			cursor: previousPageData.nextCursor,
			limit: PAGE_SIZE,
		};
	};

	const { data, size, setSize, error, mutate } = useSWRInfinite(
		getKey,
		getAlumniSWRCursor
	);

	const isLoading = !data && !error;
	console.log("data, error and isLoading>>>>>>", data, error, isLoading);
	const isLoadingMore =
		isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
	const allAlumniAnnouncement = data
		? data.reduce((prev, curr) => [...prev, ...curr.data], [])
		: [];
	const totalAlumniAnnouncement = allAlumniAnnouncement.length;
	const isEmpty = !data ? true : data?.[0]?.data.length === 0;
	const isReachingEnd =
		isEmpty ||
		(data && data[size - 1]?.data.length < PAGE_SIZE) ||
		Boolean(size > 0 && data && error);
	console.log("allAlumniAnnouncement>>>>>>", allAlumniAnnouncement);
	console.log("data and size>>>>>>", data, size);

	const loadMore = (e) => {
		e.preventDefault();
		setSize((pre) => pre + 1);
	};

	if (isLoading) {
		return <Loader />;
	}

	return (
		<Box
			sx={{
				// padding: "50px",
				margin: "auto",
				backgroundColor: "#f6f6f6",
			}}
		>
			{allAlumniAnnouncement.map((announcement) => (
				<Grid
					item
					xs={12}
					sm={12}
					md={12}
					mx={5}
					sx={{
						margin: "50px",
						boxShadow: 9,
						backgroundColor: "#fff",
						padding: "30px",
					}}
					key={announcement.id}
				>
					<Typography
						variant="h5"
						className="mb-3"
						style={{ marginTop: "10px" }}
					>
						{announcement.title}
					</Typography>
					<Typography variant="h6">{announcement.description}</Typography>
				</Grid>
			))}
			{
				<Button
					disabled={isReachingEnd || isLoadingMore}
					onClick={(e) => loadMore(e)}
				>
					{isLoadingMore && !isReachingEnd ? (
						<Loader />
					) : isReachingEnd ? (
						"No more data"
					) : (
						"Load more"
					)}
				</Button>
			}
		</Box>
	);
};

export default Announcements;
