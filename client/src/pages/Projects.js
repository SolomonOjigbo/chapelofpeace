import React, { useEffect } from "react";
import Grid from "@mui/material/Grid"; // Grid version 1
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea } from "@mui/material";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import ProjectsSlider from "../components/ProjectsSlider";
import MissionOutreachSlider from "../components/MissionOutreachSlider";
import { useNavigate } from "react-router-dom";

function Projects() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	const navigate = useNavigate();

	const handleClick = (e) => {
		e.preventDefault();
		navigate("/contact");
	};

	return (
		<Box sx={{ backgroundColor: "#f2f2f2" }}>
			<header className="unitHeader">
				<section className="hero-header">
					<Typography
						variant="h3"
						className="text-center mb-5 allTitles"
						style={{ marginTop: "150px", color: "white" }}
					>
						<strong>PROJECTS</strong>
					</Typography>
				</section>
			</header>

			<Grid
				container
				spacing={1}
				columns={12}
				justifyContent="center"
				alignItems="center"
				sx={{ padding: "20px", mt: "50px" }}
				// className='container projectsContainer'
			>
				{/**LHS**/}
				<Grid
					item
					xs={12}
					sm={12}
					md={5}
					sx={{ padding: "20px" }}
					// direction="column"
					style={{
						justifyContent: "center",
						alignItems: "center",
					}}
					align="center"
					justifyContent="center"
					alignItems="center"
				>
					<Card sx={{ maxWidth: 500 }}>
						<CardActionArea>
							<CardMedia
								component="img"
								height="200"
								image="https://res.cloudinary.com/ddsaeli9q/image/upload/v1681288866/chapelofpeacce/xsav7mqsseyjwlr6rrn0.jpg"
								alt="Chapel Project"
							/>
							<CardContent>
								<Typography gutterBottom variant="h5" component="div">
									<b>Chapel Building Project</b>
								</Typography>
								<Typography
									variant="body2"
									color="text.secondary"
									textAlign="left"
								>
									Construction of a 2ooo capacity chapel within the univeristy
								</Typography>
								<Typography
									gutterBottom
									variant="h9"
									component="div"
									textAlign="left"
								>
									<b>State:</b>
								</Typography>
								<Typography
									variant="body2"
									color="text.secondary"
									textAlign="left"
								>
									Raise all 50 columns and done flooring.
								</Typography>
								<Typography
									gutterBottom
									variant="h9"
									component="div"
									textAlign="left"
								>
									<b>Needs:</b>
								</Typography>
								<Typography
									variant="body2"
									color="text.secondary"
									textAlign="left"
								>
									Prayers for a speedy completion of the Project Prayers for
									wisdom and transformation means to reach souls in our
									contemporary times. Funds and material support to complete the
									structure.
								</Typography>
							</CardContent>
						</CardActionArea>
					</Card>
					{/**donate**/}
					<Grid
						container
						direction="column"
						justifyContent="center"
						alignItems="center"
					>
						<Typography variant="h6" className="mt-5" align="center">
							To donate and get updates on the progress, please{" "}
						</Typography>
						<Button
							variant="contained"
							size="small"
							color="primary"
							onClick={handleClick}
						>
							Contact Us
						</Button>
					</Grid>
				</Grid>

				<Grid
					item
					xs={12}
					sm={12}
					md={7}
					sx={{ padding: "20px" }}
					style={{
						justifyContent: "center",
						alignItems: "center",
					}}
					align="center"
					// direction="column"
					justifyContent="center"
					alignItems="center"
				>
					<Card sx={{ padding: "20px" }}>
						<ProjectsSlider />
					</Card>
				</Grid>
			</Grid>
			<Grid
				container
				spacing={2}
				columns={12}
				justifyContent="center"
				alignItems="center"
				sx={{ padding: "20px", mt: "100px" }}
				align="center"
			>
				<Grid item xs={12} sm={12} md={5} sx={{ padding: "20px" }}>
					<Card sx={{ maxWidth: 500 }} style={{ marginTop: "20px" }}>
						<CardActionArea>
							<CardMedia
								component="img"
								height="200"
								image="https://res.cloudinary.com/ddsaeli9q/image/upload/v1681347012/chapelofpeacce/sjbjdmuo3cflhrn76vlj.jpg"
								alt="Mission Project"
							/>
							<CardContent>
								<Typography gutterBottom variant="h5" component="div">
									<b>Missions and Outreach</b>
								</Typography>
								<Typography
									variant="body2"
									color="text.secondary"
									textAlign="left"
								>
									Funding of mission strategically and organizing Crusades to
									reach the unreached with the gospel of our Lord Jesus Christ
								</Typography>
								<Typography
									gutterBottom
									variant="h9"
									component="div"
									textAlign="left"
								>
									<b>State:</b>
								</Typography>
								<Typography
									variant="body2"
									color="text.secondary"
									textAlign="left"
								>
									From 2016 we have been organizing Campus Crusade that has led
									to over 500 souls won for Christ.
								</Typography>
								<Typography
									gutterBottom
									variant="h9"
									component="div"
									textAlign="left"
								>
									<b>Needs:</b>
								</Typography>
								<Typography
									variant="body2"
									color="text.secondary"
									textAlign="left"
								>
									<ul>
										<li>
											Prayers for wisdom and transformation means to reach souls
											in our contemporary time
										</li>
										<li>
											Funds and material support for holistic ministry and
											missions.
										</li>
									</ul>
								</Typography>
							</CardContent>
						</CardActionArea>
					</Card>
					<Grid
						container
						direction="column"
						justifyContent="center"
						alignItems="center"
					>
						<Typography className="mt-5" align="center">
							To donate and get updates on the progress, please{" "}
						</Typography>
						<Button
							variant="contained"
							size="small"
							color="primary"
							onClick={handleClick}
						>
							Contact Us
						</Button>
					</Grid>
				</Grid>
				<Grid
					item
					xs={12}
					sm={12}
					md={7}
					justifyContent="center"
					alignItems="center"
					style={{
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Card sx={{ padding: "20px" }}>
						<MissionOutreachSlider />
					</Card>
				</Grid>
			</Grid>

			{/**CTA**/}

			<Grid
				container
				direction="column"
				justifyContent="center"
				alignItems="center"
			>
				<Grid className="unitCTA mt-5">
					<Typography
						variant="h3"
						className="mb-5 mt-5"
						style={{ color: "white" }}
					>
						Join us...in reaching the unreached for Christ
					</Typography>
					<Button
						variant="contained"
						size="small"
						color="primary"
						onClick={handleClick}
					>
						Learn more
					</Button>
				</Grid>
			</Grid>
		</Box>
	);
}

export default Projects;
