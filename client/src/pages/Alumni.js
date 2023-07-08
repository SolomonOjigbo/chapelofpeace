import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import Announcements from "../components/Announcements";
import Testimonial from "../components/Testimonial";
import { useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";
// import { Link, Navigate } from "react-router-dom";

function Alumni() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	const navigate = useNavigate();

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
								The Purpose of our Lord and Saviour must be established. The
								vision never dies!
							</Typography>

							<Typography
								variant="h4"
								className="mb-2 mt-4 allTitles"
								// style={{ marginTop: '100px' }}
								style={{ color: "white" }}
							>
								<strong>Alumni Corner</strong>
							</Typography>
							<Button
								variant="contained"
								size="small"
								color="primary"
								onClick={() => navigate("/alumni-membership")}
							>
								REGISTER HERE
							</Button>
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
					<Typography
						variant="h4"
						className="mb-3 mt- 3 allTitles"
						style={{ marginTop: 50 }}
					>
						EVENTS AND ANNOUNCEMENT
					</Typography>
					<Announcements />

					{/**Testimonies**/}
					<Typography
						variant="h4"
						className="mb-2 allTitles"
						style={{ marginTop: "60px" }}
					>
						<strong>Testimonies</strong>
					</Typography>
				</Grid>
				<Grid
					container
					spacing={2}
					columns={12}
					justifyContent="center"
					alignItems="center"
					style={{ paddingBottom: "100px", paddingTop: "70px" }}
				>
					<Testimonial isMobile={isMobile} />
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

export default Alumni;
