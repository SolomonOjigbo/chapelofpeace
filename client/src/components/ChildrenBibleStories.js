import React from "react";
import useSWRInfinite from "swr/infinite";

import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Grid,
	Stack,
	Typography,
} from "@mui/material";
import Loader from "../admin/components/Loader";
import { getChildrenStorySWRCursor } from "../lib/childrenStory";

const ChildrenBibleStories = () => {
	const PAGE_SIZE = 3;
	const getKey = (pageIndex, previousPageData) => {
		//if no user or reached the end, do not fetch
		if (previousPageData && !previousPageData.data) return null;

		//first page, we do not
		if (pageIndex === 0)
			return { path: "/children-stories", cursor: 0, limit: PAGE_SIZE };

		//add the cursor to the API e
		console.log(previousPageData.nextCursor);
		return {
			path: "/children-stories",
			cursor: previousPageData.nextCursor,
			limit: PAGE_SIZE,
		};
	};

	const { data, size, setSize, error, mutate } = useSWRInfinite(
		getKey,
		getChildrenStorySWRCursor
	);
	const isLoading = !data && !error;
	const isLoadingMore =
		isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
	const allChildrenStory = data
		? data.reduce((prev, curr) => [...prev, ...curr.data], [])
		: [];
	const totalChildrenStory = allChildrenStory.length;
	const isEmpty = !data ? true : data?.[0]?.data.length === 0;
	const isReachingEnd =
		isEmpty ||
		(data && data[size - 1]?.data.length < PAGE_SIZE) ||
		Boolean(size > 0 && data && error);
	console.log("allChildrenStory>>>>>>", allChildrenStory);
	console.log("data and size>>>>>>", data, size);

	const loadMore = (e) => {
		e.preventDefault();
		setSize((pre) => pre + 1);
	};

	if (isLoading) {
		return <Loader />;
	}

	return (
		<Box>
			<Grid
				container
				spacing={2}
				columns={12}
				justifyContent="center"
				alignItems="center"
				sx={{ padding: "50px" }}
				style={{ marginTop: "20px" }}
			>
				{allChildrenStory.map((story) => (
					<Grid item xs={12} sm={12} md={4} align="center" key={story.id}>
						<Card sx={{ maxWidth: 350, minHeight: 450 }} align="center">
							<CardMedia
								component="img"
								height="200"
								image={story.photo}
								alt="Children Bible Story"
							/>
							<CardContent>
								<Typography variant="h6">{story.title}</Typography>
								<Typography variant="body2">{story.description}</Typography>
							</CardContent>
							<CardActions align="center">
								<Stack
									direction={{ xs: "column", sm: "row" }}
									spacing={{ xs: 1, sm: 2, md: 4 }}
									align="center"
								>
									<Typography>Author: {story.author}</Typography>
								</Stack>
							</CardActions>
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
		</Box>
	);
};

export default ChildrenBibleStories;
