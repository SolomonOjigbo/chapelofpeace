import React, { useEffect } from "react";
import Grid from "@mui/material/Grid"; // Grid version 1
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea } from "@mui/material";
import useSWRInfinite from "swr/infinite";
import Button from "@mui/material/Button";
// import CardActions from "@mui/material/CardActions";
import Loader from "../admin/components/Loader";
import { getBibleStudySWRCursor } from "../lib/bibleStudy";
import BibleStudySchedule from "../components/BibleStudySchedule";

const PAGE_SIZE = 3;

// const style = {
// 	position: "absolute",
// 	top: "50%",
// 	left: "50%",
// 	transform: "translate(-50%, -50%)",
// 	width: 400,
// 	bgcolor: "background.paper",
// 	border: "2px solid #000",
// 	boxShadow: 24,
// 	p: 4,
// };

function BibleStudy() {
	const [open, setOpen] = React.useState(false);
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const getKey = (pageIndex, previousPageData) => {
		//if no user or reached the end, do not fetch
		if (previousPageData && !previousPageData.data) return null;

		//first page, we do not
		if (pageIndex === 0)
			return { path: "/bible-studies", cursor: 0, limit: PAGE_SIZE };

		//add the cursor to the API e
		console.log(previousPageData.nextCursor);
		return {
			path: "/bible-studies",
			cursor: previousPageData.nextCursor,
			limit: PAGE_SIZE,
		};
	};

	const { data, size, setSize, error, mutate } = useSWRInfinite(
		getKey,
		getBibleStudySWRCursor
	);
	const isLoading = !data && !error;
	const isLoadingMore =
		isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
	const allBibleStudy = data
		? data.reduce((prev, curr) => [...prev, ...curr.data], [])
		: [];
	// const totalBibleStudy = allBibleStudy.length;
	const isEmpty = !data ? true : data?.[0]?.data.length === 0;
	const isReachingEnd =
		isEmpty ||
		(data && data[size - 1]?.data.length < PAGE_SIZE) ||
		Boolean(size > 0 && data && error);

	console.log("allBibleStudy>>>>>>", allBibleStudy);
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
			<header className="unitHeader">
				<section className="hero-header">
					<Typography
						variant="h3"
						className="text-center mb-5 allTitles"
						style={{ marginTop: "150px", color: "white" }}
					>
						<strong>BIBLE STUDY</strong>
					</Typography>
				</section>
			</header>
			<Grid container sx={{ backgroundColor: "#f1f1f1", padding: 10 }}>
				<BibleStudySchedule />
			</Grid>
			<Grid
				container
				sx={{
					backgroundColor: "#f9f9f9",
					alignContent: "center",
					justifyContent: "center",
				}}
			>
				<Box>
					<Typography
						variant="h4"
						className="text-center mb-5 allTitles"
						style={{ marginTop: "150px" }}
					>
						<strong>ALL BIBLE STUDIES</strong>
					</Typography>

					<Grid
						container
						spacing={2}
						columns={12}
						justifyContent="center"
						alignItems="center"
						sx={{ paddingBottom: "50px" }}
					>
						{allBibleStudy.map((bible) => (
							<Grid item xs={12} sm={12} md={3}>
								<Card
									sx={{ maxWidth: 500, minHeight: 420 }}
									// style={{ marginTop: "20px" }}
								>
									<CardActionArea>
										<CardMedia
											component="img"
											height="220"
											image={bible.photo}
											alt={bible.title}
										/>
										<CardContent>
											<Typography gutterBottom variant="h6" component="div">
												{bible.title}
											</Typography>
											<Typography variant="body2" color="text.secondary">
												{bible.description}
											</Typography>
										</CardContent>
									</CardActionArea>
								</Card>
							</Grid>
						))}

						{/* <Grid
					container
					direction="column"
					justifyContent="center"
					alignItems="center"
				>
					<Button
						variant="contained"
						size="small"
						color="primary"
						className="mt-4 mb-4"
					>
						View All Topics
					</Button>
				</Grid> */}
					</Grid>
				</Box>
				<Grid
					container
					sx={{
						backgroundColor: "#f9f9f9",
						alignContent: "center",
						justifyContent: "center",
						paddingBottom: 10,
					}}
				>
					{
						<Button
							variant="contained"
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
			</Grid>
		</>
	);
}

export default BibleStudy;
