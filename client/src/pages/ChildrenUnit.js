import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import ChildrenBibleStories from "../components/ChildrenBibleStories";
import SongLyrics from "../components/SongLyrics";
import MemoryVerse from "../components/MemoryVerse";

function ChildrenUnit() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<>
			<Box sx={{ backgroundColor: "#f2f2f3" }}>
				<header className="unitHeader">
					<section className="hero-header">
						<Typography
							variant="h3"
							className="text-center mb-5 allTitles"
							style={{ marginTop: "150px", color: "white" }}
						>
							<strong>CHILDREN UNIT</strong>
						</Typography>
					</section>
				</header>
				<Typography
					variant="h6"
					sx={{ padding: "10px" }}
					className="mb-5 mt-5"
					align="center"
				>
					Our children ministery is driven with the vision to raise the next
					godly generation by equiping the total child in the word of God
				</Typography>

				<Typography variant="h4" className="text-center mb-2 allTitles">
					<strong>Children Bible Stories</strong>
				</Typography>
				<Grid
					container
					spacing={4}
					columns={12}
					justifyContent="center"
					alignItems="center"
					// sx={{ padding: "10px" }}
				>
					<ChildrenBibleStories />
				</Grid>
				<Typography variant="h4" sx={{ mt: 4, mb: 4 }} align="center">
					Children Songs & Lyrics
				</Typography>
				<Grid
					container
					spacing={1}
					columns={12}
					justifyContent="center"
					alignItems="center"
					sx={{ padding: "10px" }}
				>
					<SongLyrics />
				</Grid>

				<Typography variant="h4" sx={{ mb: 4, mt: 5 }} align="center">
					Memory Verses:
				</Typography>
				<Grid
					container
					spacing={1}
					columns={12}
					justifyContent="center"
					alignItems="center"
					sx={{ padding: "10px" }}
				>
					<MemoryVerse />
				</Grid>
			</Box>
		</>
	);
}

export default ChildrenUnit;
