import React from "react";
import useSWRInfinite from "swr/infinite";
import { getBibleStudySchedulesSWRCursor } from "../lib/bibleStudySchedule";
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Grid,
	Modal,
	Typography,
} from "@mui/material";
import Loader from "../admin/components/Loader";

const PAGE_SIZE = 3;
const BibleStudySchedule = () => {
	const getKey = (pageIndex, previousPageData) => {
		//if no user or reached the end, do not fetch
		if (previousPageData && !previousPageData.data) return null;

		//first page, we do not
		if (pageIndex === 0)
			return { path: "/bible-study-schedules", cursor: 0, limit: PAGE_SIZE };

		//add the cursor to the API e
		console.log(previousPageData.nextCursor);
		return {
			path: "/bible-study-schedules",
			cursor: previousPageData.nextCursor,
			limit: PAGE_SIZE,
		};
	};

	const { data, size, setSize, error, mutate } = useSWRInfinite(
		getKey,
		getBibleStudySchedulesSWRCursor
	);
	const isLoading = !data && !error;
	const isLoadingMore =
		isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
	const allBibleStudySchedules = data
		? data.reduce((prev, curr) => [...prev, ...curr.data], [])
		: [];
	const totalBibleStudySchedules = allBibleStudySchedules.length;
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
		<Box
			marginTop="50px"
			alignItems="center"
			alignContent="center"
			justifyContent="center"
			margin="auto"
		>
			<Typography variant="h4" className="text-center mb-5 allTitles">
				<strong>Bible Study Schedule</strong>
			</Typography>
			<Grid
				container
				spacing={2}
				columns={12}
				gap={2}
				justifyContent="center"
				alignItems="center"
				sx={{ padding: "10px" }}
			>
				{allBibleStudySchedules.map((schedule) => (
					<Card sx={{ minWidth: "200px", maxWidth: "400px", padding: "30px" }}>
						<CardContent>
							<Typography gutterBottom variant="body" component="div">
								<span style={{ display: "flex" }}>
									<h5>Date: {schedule.date}</h5>
								</span>
							</Typography>
							<Typography variant="body2" color="text.secondary">
								<span style={{ display: "flex" }}>
									<h5>Time: {schedule.time}</h5>
								</span>
							</Typography>
							<Typography variant="body2" color="text.secondary">
								<span style={{ display: "flex" }}>
									<h5>Venue: </h5>
									{schedule.venue}
								</span>
							</Typography>
						</CardContent>
						<CardActions>
							<Button
								variant="contained"
								size="small"
								onClick={() => window.open(`${schedule.zoom_link}`, "_blank")}
							>
								Join Online via zoom
							</Button>
							<Button
								variant="contained"
								size="small"
								color="success"
								onClick={() => window.open(`${schedule.bulletin}`, "_blank")}
							>
								Download Bulletin
							</Button>
						</CardActions>
					</Card>
				))}
			</Grid>
			<Grid
				container
				sx={{
					backgroundColor: "#f9f9f9",
					alignContent: "center",
					justifyContent: "center",
				}}
			>
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

export default BibleStudySchedule;
