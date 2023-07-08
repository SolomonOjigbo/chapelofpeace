import React from "react";

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

import useSWRInfinite from "swr/infinite";

import { getPrayerMeetingBulletinSWRCursor } from "../lib/prayerMeeting";
import Loader from "../admin/components/Loader";

const PrayerMeetings = () => {
	const PAGE_SIZE = 5;
	const getKey = (pageIndex, previousPageData) => {
		//if no user or reached the end, do not fetch
		if (previousPageData && !previousPageData.data) return null;

		//first page, we do not
		if (pageIndex === 0)
			return { path: "/prayer-meeting-bulletin", cursor: 0, limit: PAGE_SIZE };

		//add the cursor to the API e
		console.log(previousPageData.nextCursor);
		return {
			path: "/prayer-meeting-bulletin",
			cursor: previousPageData.nextCursor,
			limit: PAGE_SIZE,
		};
	};

	const { data, size, setSize, error, mutate } = useSWRInfinite(
		getKey,
		getPrayerMeetingBulletinSWRCursor
	);
	const isLoading = !data && !error;
	const isLoadingMore =
		isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
	const allPrayerMeetingBulletin = data
		? data.reduce((prev, curr) => [...prev, ...curr.data], [])
		: [];
	// const totalPrayerMeetingBulletin = allPrayerMeetingBulletin.length;
	const isEmpty = !data ? true : data?.[0]?.data.length === 0;
	const isReachingEnd =
		isEmpty ||
		(data && data[size - 1]?.data.length < PAGE_SIZE) ||
		Boolean(size > 0 && data && error);
	console.log("allPrayerMeetingBulletin>>>>>>", allPrayerMeetingBulletin);
	console.log("data and size>>>>>>", data, size);

	const loadMore = (e) => {
		e.preventDefault();
		setSize((pre) => pre + 1);
	};

	if (isLoading) {
		return <Loader />;
	}

	return (
		<Box display="flex" flexDirection="column" justifyContent="center">
			<Grid
				container
				justifyContent="center"
				alignItems="center"
				style={{ marginTop: 20, padding: "20px" }}
				display="flex"
				gap={2}
			>
				{allPrayerMeetingBulletin.map((prayer) => (
					<Grid item xs={12} sm={12} md={3.5} key={prayer.id}>
						<Card sx={{ minHeight: "400px" }}>
							<CardMedia
								component="img"
								height="200"
								width="300px"
								image={prayer.photo}
								alt="Weekly Prayer Meeting"
							/>
							<CardContent>
								<Typography variant="h6">Date: {prayer.date}</Typography>
								<Typography variant="h6">Time: {prayer.time}</Typography>
								<Typography variant="h6">Venue: {prayer.venue}</Typography>
							</CardContent>
							<CardActions align="center">
								<Stack
									direction={{ xs: "column", sm: "row" }}
									spacing={{ xs: 1, sm: 2, md: 4 }}
									align="center"
								>
									<Button
										variant="contained"
										size="small"
										color="primary"
										align="center"
										onClick={() => window.open(`${prayer.zoom_link}`, "_blank")}
									>
										Zoom Link - Prayer
									</Button>
								</Stack>
							</CardActions>
						</Card>
					</Grid>
				))}
			</Grid>
			<Box sx={{ margin: "auto" }}>
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
		</Box>
	);
};

export default PrayerMeetings;
