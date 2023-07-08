import {
	Button,
	Card,
	CardActions,
	CardContent,
	Grid,
	Typography,
} from "@mui/material";
import React from "react";
import useSWRInfinite from "swr/infinite";

import { getChildrenSongsSWRCursor } from "../lib/childrenSongs";
import Loader from "../admin/components/Loader";

const PAGE_SIZE = 5;

const SongLyrics = () => {
	const getKey = (pageIndex, previousPageData) => {
		//if no user or reached the end, do not fetch
		if (previousPageData && !previousPageData.data) return null;

		//first page, we do not
		if (pageIndex === 0)
			return { path: "/children-songs", cursor: 0, limit: PAGE_SIZE };

		//add the cursor to the API e
		console.log(previousPageData.nextCursor);
		return {
			path: "/children-songs",
			cursor: previousPageData.nextCursor,
			limit: PAGE_SIZE,
		};
	};

	const { data, size, setSize, error, mutate } = useSWRInfinite(
		getKey,
		getChildrenSongsSWRCursor
	);
	const isLoading = !data && !error;
	const isLoadingMore =
		isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
	const allChildrenSongs = data
		? data.reduce((prev, curr) => [...prev, ...curr.data], [])
		: [];
	// const totalChildrenSongs = allChildrenSongs.length;
	const isEmpty = !data ? true : data?.[0]?.data.length === 0;
	const isReachingEnd =
		isEmpty ||
		(data && data[size - 1]?.data.length < PAGE_SIZE) ||
		Boolean(size > 0 && data && error);
	console.log("allChildrenSongs>>>>>>", allChildrenSongs);
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
				spacing={2}
				columns={12}
				gap={2}
				justifyContent="center"
				alignItems="center"
				sx={{ padding: "10px" }}
			>
				{allChildrenSongs.map((song) => (
					<Card
						sx={{
							minWidth: "200px",
							maxWidth: "290px",
							minHeight: "280px",
							padding: "30px",
							background: `linear-gradient(rgba(23, 38, 255, 1), rgb(192, 72, 72, 0.8)),
    url('https://ik.imagekit.io/ikmedia/blog/hero-image.jpeg')`,
						}}
					>
						<CardContent>
							<Typography gutterBottom variant="body" component="div">
								<span style={{ display: "flex" }}>
									<h5 style={{ color: "white" }}>Song Title: {song.title}</h5>
								</span>
							</Typography>

							<Typography variant="body2" color="text.secondary">
								<span style={{ display: "flex" }}>
									<h6 style={{ color: "white" }}>
										Description:
										{song.description}
									</h6>
								</span>
							</Typography>
						</CardContent>
						<CardActions>
							<Button
								variant="contained"
								size="small"
								onClick={() => window.open(`${song.url}`, "_blank")}
							>
								View Song/ Lyrics
							</Button>
						</CardActions>
					</Card>
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

export default SongLyrics;
