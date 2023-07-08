import React, { useEffect, useState } from "react";

// import Loader from "../components/Loader";
import useSWRInfinite from "swr/infinite";
import { Box, Grid, Pagination, Stack, Typography } from "@mui/material";
import BlogCard from "./BlogCard";
import { getPostsSWRCursor } from "../lib/post";

function BlogPostList() {
	const [posts, setPosts] = useState([]);

	const PAGE_SIZE = 30;
	const getKey = (pageIndex, previousPageData) => {
		//if no user or reached the end, do not fetch
		if (previousPageData && !previousPageData.data) return null;

		//first page, we do not
		if (pageIndex === 0) return { path: "/post", cursor: 0, limit: PAGE_SIZE };

		//add the cursor to the API e
		console.log(previousPageData.nextCursor);
		return {
			path: "/post",
			cursor: previousPageData.nextCursor,
			limit: PAGE_SIZE,
		};
	};
	const { data, size, setSize, error, mutate } = useSWRInfinite(
		getKey,
		getPostsSWRCursor
	);
	useEffect(() => {
		const isLoading = !data && !error;
		const isLoadingMore =
			isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
		const allPosts = data
			? data.reduce((prev, curr) => [...prev, ...curr.data], [])
			: [];
		const totalPosts = allPosts.length;
		const isEmpty = !data ? true : data?.[0]?.data.length === 0;
		const isReachingEnd =
			isEmpty ||
			(data && data[size - 1]?.data.length < PAGE_SIZE) ||
			Boolean(size > 0 && data && error);
		console.log("allPosts>>>>>>", allPosts);
		console.log("data and size>>>>>>", data, size);
		setPosts(allPosts);
	}, [data]);

	return (
		<Grid container spacing={2} columns={12}>
			<Grid
				container
				spacing={2}
				columns={12}
				sx={{ mx: "auto", justifyContent: "center" }}
			>
				<Typography variant="h4" align="center" sx={{ mb: 3, mt: 5 }}>
					Latest posts
				</Typography>
			</Grid>

			{/* <Box
				display="flex"
				flexDirection="row"
				padding="20px"
				alignContent="center"
				justifyContent="center"
				width="auto"
			> */}
			{posts.map((post) => (
				<Grid
					item
					xs={12}
					sm={12}
					md={4}
					justifyContent="center"
					alignItems="center"
					key={post.id}
				>
					<BlogCard post={post} />
				</Grid>
			))}
			{/* </Box> */}
		</Grid>
	);
}

export default BlogPostList;
