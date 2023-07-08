import React, { useEffect, useMemo, useState } from "react";
import Loader from "../admin/components/Loader";
import { getEventsSWRCursor } from "../lib/events";
import useSWRInfinite from "swr/infinite";
import { styled } from "@mui/material/styles";
import Swal from "sweetalert2";
import {
	Box,
	Button,
	Card,
	CardContent,
	CardMedia,
	Grid,
	Typography,
} from "@mui/material";

const PAGE_SIZE = 5;

const modalStyles = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
	zIndex: 1,
};

// const Item = styled(Paper)(({ theme }) => ({
// 	backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
// 	...theme.typography.body2,
// 	padding: theme.spacing(1),
// 	textAlign: "center",
// 	color: theme.palette.text.secondary,
// }));
const EventsWidget = () => {
	const [open, setOpen] = useState(false);
	const [events, setEvents] = useState([]);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const getKey = (pageIndex, previousPageData) => {
		//if no user or reached the end, do not fetch
		if (previousPageData && !previousPageData.data) return null;

		//first page, we do not
		if (pageIndex === 0)
			return { path: "/events", cursor: 0, limit: PAGE_SIZE };

		//add the cursor to the API e
		console.log(previousPageData.nextCursor);
		return {
			path: "/events",
			cursor: previousPageData.nextCursor,
			limit: PAGE_SIZE,
		};
	};

	const { data, size, setSize, error } = useSWRInfinite(
		getKey,
		getEventsSWRCursor
	);
	const isLoading = !data && !error;
	const isLoadingMore =
		isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");

	const getEvents = useMemo(() => {
		const allEvents = data
			? data.reduce((prev, curr) => [...prev, ...curr.data], [])
			: [];
		return allEvents;
	}, [data]);

	useEffect(() => {
		setEvents(getEvents);
	}, [getEvents]);

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
			<Grid
				container
				columns={12}
				display="flex"
				spacing={3}
				justifyContent="center"
				align="center"
				sx={{
					paddingBottom: "100px",
					alignContent: "center",
					justifyContent: "center",

					margin: "auto",
				}}
			>
				{events.map((event) => (
					<Grid
						gap={1}
						item
						xs={12}
						sm={12}
						md={4}
						justifyContent="center"
						alignItems="center"
						key={event.id}
					>
						<Card sx={{ maxWidth: 350, minHeight: 400 }}>
							<CardMedia
								component="img"
								height="200"
								image={event.photo}
								alt={event.title}
							/>
							<CardContent>
								<Typography gutterBottom variant="h7" component="div">
									{event.title}
								</Typography>
								<Typography variant="body2" color="text.secondary">
									{event.description}
								</Typography>
							</CardContent>
							{/* <CardActions>
								<Button
									variant="contained"
									size="small"
									color="primary"
									onClick={handleClick}
								>
									View More
								</Button>
							</CardActions> */}
						</Card>
					</Grid>
				))}
			</Grid>
			<Grid
				container
				sx={{
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
		</>
	);
};

export default EventsWidget;
