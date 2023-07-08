import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid"; // Grid version 1
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import useSWRInfinite from "swr/infinite";
import { getPartnersSWRCursor } from "../lib/partners";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Loader from "../admin/components/Loader";
import { Box } from "@mui/material";

function Partners() {
	const [expanded, setExpanded] = useState(false);
	const PAGE_SIZE = 5;

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const ExpandMore = styled((props) => {
		const { expand, ...other } = props;
		return <IconButton {...other} />;
	})(({ theme, expand }) => ({
		transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
		marginLeft: "auto",
		transition: theme.transitions.create("transform", {
			duration: theme.transitions.duration.shortest,
		}),
	}));

	const getKey = (pageIndex, previousPageData) => {
		//if no user or reached the end, do not fetch
		if (previousPageData && !previousPageData.data) return null;

		//first page, we do not
		if (pageIndex === 0)
			return { path: "/partner", cursor: 0, limit: PAGE_SIZE };

		//add the cursor to the API e
		console.log(previousPageData.nextCursor);
		return {
			path: "/partner",
			cursor: previousPageData.nextCursor,
			limit: PAGE_SIZE,
		};
	};

	const { data, size, setSize, error, mutate } = useSWRInfinite(
		getKey,
		getPartnersSWRCursor
	);
	const isLoading = !data && !error;
	const isLoadingMore =
		isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
	const allPartners = data
		? data.reduce((prev, curr) => [...prev, ...curr.data], [])
		: [];
	// const totalPartners = allPartners.length;
	const isEmpty = !data ? true : data?.[0]?.data.length === 0;
	const isReachingEnd =
		isEmpty ||
		(data && data[size - 1]?.data.length < PAGE_SIZE) ||
		Boolean(size > 0 && data && error);
	console.log("allPartners>>>>>>", allPartners);
	console.log("data and size>>>>>>", data, size);

	const loadMore = (e) => {
		e.preventDefault();
		setSize((pre) => pre + 1);
	};

	if (isLoading) {
		return <Loader />;
	}

	return (
		<Box sx={{ backgroundColor: "#f2f2f3" }}>
			<header className="unitHeader">
				<section className="hero-header">
					<Typography
						variant="h3"
						className="text-center mb-5 allTitles"
						style={{ marginTop: "150px", color: "white" }}
					>
						<strong>OUR PARTNERS</strong>
					</Typography>
				</section>
			</header>
			<Grid
				container
				columns={12}
				justifyContent="center"
				alignItems="center"
				// className="partnersContainer"
				margin="auto"
				marginBottom="100px"
				padding="50px"
			>
				{allPartners.map((partner) => (
					<Grid item xs={12} sm={12} md={4} key={partner.id}>
						<Card sx={{ maxWidth: "400px" }}>
							<CardHeader
								avatar={
									<Avatar
										sx={{ bgcolor: red[500] }}
										aria-label="recipe"
										src={partner.photo}
									/>
								}
								action={
									<IconButton aria-label="settings">
										<MoreVertIcon />
									</IconButton>
								}
								title={partner.name}
								subheader={partner.title}
							/>
							<CardMedia
								component="img"
								height="230"
								image={partner.photo}
								alt="Paella dish"
							/>
							<CardContent>
								<Typography variant="body2" color="text.secondary">
									{partner.description}
								</Typography>
							</CardContent>
							<CardActions disableSpacing>
								<ExpandMore
									expand={expanded}
									onClick={handleExpandClick}
									aria-expanded={expanded}
									aria-label="show more"
								>
									<Typography>Show More</Typography>
									<ExpandMoreIcon />
								</ExpandMore>
							</CardActions>
							<Collapse in={expanded} timeout="auto" unmountOnExit>
								<CardContent>{partner.content}</CardContent>
							</Collapse>
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
}

export default Partners;
