import React, { useEffect } from "react";
// import Footer from "../components/Footer";
import MoreInfo from "../components/MoreInfo";
import Slider from "../components/Slider";
import Grid from "@mui/material/Grid"; // Grid version 1
import Testimonial from "../components/Testimonial";
import BlogPostList from "../components/BlogPostList";
import { Box, Typography } from "@mui/material";
import { isMobile } from "react-device-detect";

function Home() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<Box sx={{ flexGrow: 1, marginBottom: 5, backgroundColor: "#f7f7f7" }}>
			<Slider />
			<MoreInfo />
			<Grid
				container
				align="center"
				style={{ margin: "auto", backgroundColor: "#d7d7d7", align: "center" }}
			>
				<BlogPostList />
			</Grid>
			<Typography
				variant="h4"
				className="text-center allTitles"
				style={{ marginTop: "50px" }}
			>
				Testimonials
			</Typography>
			<Grid
				container
				display="flex"
				columns={12}
				margin="auto"
				spacing={2}
				justifyContent="center"
				alignItems="center"
				style={{ paddingBottom: "100px", paddingTop: "70px" }}
			>
				<Testimonial isMobile={isMobile} />
			</Grid>
		</Box>
	);
}

export default Home;
