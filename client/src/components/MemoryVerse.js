import {
	Box,
	Button,
	Card,
	CardContent,
	CardMedia,
	Grid,
	Typography,
} from "@mui/material";
import React from "react";
import Loader from "../admin/components/Loader";
import { getMemoryVerseSWRCursor } from "../lib/memoryVerse";
import useSWRInfinite from "swr/infinite";

const MemoryVerse = () => {
	const PAGE_SIZE = 5;

	const getKey = (pageIndex, previousPageData) => {
		//if no user or reached the end, do not fetch
		if (previousPageData && !previousPageData.data) return null;

		//first page, we do not
		if (pageIndex === 0)
			return { path: "/memory-verse", cursor: 0, limit: PAGE_SIZE };

		//add the cursor to the API e
		console.log(previousPageData.nextCursor);
		return {
			path: "/memory-verse",
			cursor: previousPageData.nextCursor,
			limit: PAGE_SIZE,
		};
	};

	const { data, size, setSize, error, mutate } = useSWRInfinite(
		getKey,
		getMemoryVerseSWRCursor
	);
	const isLoading = !data && !error;
	const isLoadingMore =
		isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
	const allMemoryVerse = data
		? data.reduce((prev, curr) => [...prev, ...curr.data], [])
		: [];
	const totalMemoryVerallMemoryVerse = allMemoryVerse.length;
	const isEmpty = !data ? true : data?.[0]?.data.length === 0;
	const isReachingEnd =
		isEmpty ||
		(data && data[size - 1]?.data.length < PAGE_SIZE) ||
		Boolean(size > 0 && data && error);

	console.log("allMemoryVerse>>>>>>", allMemoryVerse);
	console.log("data and size>>>>>>", data, size);

	const loadMore = (e) => {
		e.preventDefault();
		setSize((pre) => pre + 1);
	};

	if (isLoading) {
		return <Loader />;
	}
	return (
		<>
			<Grid
				container
				columns={12}
				sx={{
					alignContent: "center",
					justifyContent: "center",
					alignItems: "center",
					padding: "50px",
					margin: "auto",
				}}
			>
				{allMemoryVerse.map((verse) => (
					<Grid item xs={12} sm={12} md={3} align="center" key={verse.id}>
						<Card sx={{ width: 320, minHeight: 400 }}>
							<CardMedia
								component="img"
								height="140"
								image={verse.url}
								alt="green iguana"
							/>
							<CardContent>
								<Typography
									gutterBottom
									variant="h5"
									component="div"
									align="center"
								>
									{verse.title}
								</Typography>
								<Typography variant="body2" color="text.secondary">
									{verse.description}
								</Typography>
							</CardContent>
						</Card>
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
			</Grid>
		</>
	);
};

export default MemoryVerse;
