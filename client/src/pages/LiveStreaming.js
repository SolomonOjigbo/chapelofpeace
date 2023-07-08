import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import useSWRInfinite from "swr/infinite";
import { useNavigate } from "react-router-dom";
import Loader from "../admin/components/Loader";
import { getLiveStreamingSWRCursor } from "../lib/liveStreaming";

// import { Link, Navigate } from "react-router-dom";

const PAGE_SIZE = 5;

function LiveStreaming() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	const navigate = useNavigate();

	const getKey = (pageIndex, previousPageData) => {
		//if no user or reached the end, do not fetch
		if (previousPageData && !previousPageData.data) return null;

		//first page, we do not
		if (pageIndex === 0)
			return { path: "/live-streaming", cursor: 0, limit: PAGE_SIZE };
		return {
			path: "/live-streaming",
			cursor: previousPageData.nextCursor,
			limit: PAGE_SIZE,
		};
	};
	const { data, size, setSize, error, mutate } = useSWRInfinite(
		getKey,
		getLiveStreamingSWRCursor
	);
	const isLoading = !data && !error;
	const isLoadingMore =
		isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
	const allLiveStreaming = data
		? data.reduce((prev, curr) => [...prev, ...curr.data], [])
		: [];
	const totalLiveStreaming = allLiveStreaming.length;
	const isEmpty = !data ? true : data?.[0]?.data.length === 0;
	const isReachingEnd =
		isEmpty ||
		(data && data[size - 1]?.data.length < PAGE_SIZE) ||
		Boolean(size > 0 && data && error);

	const loadMore = (e) => {
		e.preventDefault();
		setSize((pre) => pre + 1);
	};

	if (isLoading) {
		return <Loader />;
	}

	return (
		<>
			<Box sx={{ backgroundColor: "#f2f2f3" }}>
				<header className="unitHeader">
					<section className="hero-header">
						<Grid
							item
							xs={12}
							sm={12}
							md={12}
							align="center"
							className="unitHeader
"
						>
							<Typography
								variant="h4"
								className="mb-5 mt-3 "
								style={{ color: "white" }}
							>
								Live Stream from our channel on Mixlr and Youtube
							</Typography>

							<Typography
								variant="h4"
								className="mb-2 mt-4 allTitles"
								// style={{ marginTop: '100px' }}
								style={{ color: "white" }}
							>
								<strong>Live Stream</strong>
							</Typography>
						</Grid>
					</section>
				</header>

				<Grid
					container
					columns={12}
					justifyContent="center"
					alignItems="center"
					sx={{ padding: "20px" }}
				>
					{allLiveStreaming.map((livestream) => (
						<Grid
							item
							xs={12}
							sm={5}
							md={5}
							mx={2}
							sx={{
								margin: "20px",
								boxShadow: 9,
								backgroundColor: "#fff",
								padding: "30px",
							}}
							key={livestream.id}
						>
							<Typography
								variant="h5"
								className="mb-3 mt- 3 allTitles"
								style={{ marginTop: 50 }}
							>
								Title: <span style={{ fontSize: 17 }}> {livestream.title}</span>
							</Typography>
							<Typography
								variant="h6"
								className="mb-3 mt- 3 allTitles"
								style={{ marginTop: 30 }}
							>
								Description:{" "}
								<span style={{ fontSize: 16 }}>{livestream.description}</span>
							</Typography>
							<Button
								variant="contained"
								onClick={() => (window.location.href = `${livestream.link}`)}
							>
								Go to Live Stream
							</Button>
						</Grid>
					))}
				</Grid>
				<Grid xs={12} sm={12} md={12} className="unitHeader">
					<Typography
						variant="h5"
						className="mb-5 mt-5"
						style={{ color: "white", padding: "10px" }}
					>
						We are stronger together. Join and be part of the drive to support
						one another and advance the kingdom of our God
					</Typography>
				</Grid>
			</Box>
		</>
	);
}

export default LiveStreaming;
