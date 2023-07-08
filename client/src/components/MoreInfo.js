import React from "react";
import Grid from "@mui/material/Grid"; // Grid version 1
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea } from "@mui/material";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import { useNavigate } from "react-router-dom";
import EventsWidget from "./EventsWidget";
// import { margin } from "@mui/system";

function MoreInfo() {
	const navigate = useNavigate();

	return (
		<>
			<Grid
				container
				spacing={2}
				columns={12}
				sx={{ paddingY: "150px", backgroundColor: "#d7d7d7" }}
				margin="auto"
				justifyContent="center"
				align="center"
				alignContent="center"
			>
				<Grid
					item
					xs={12}
					sm={12}
					md={4}
					justifyContent="center"
					alignItems="center"
				>
					<Card sx={{ maxWidth: 350, minHeight: 400 }}>
						<CardActionArea>
							<CardMedia
								component="img"
								height="200"
								image="https://img.freepik.com/free-vector/illustration-business-target-icon_53876-5898.jpg?w=740&t=st=1666193805~exp=1666194405~hmac=35ae5b83d2543488392792cbfdece54e3dfb72cd02e5312cb3ed93ea9f360346"
								alt="green iguana"
							/>
							<CardContent>
								<Typography gutterBottom variant="h5" component="div">
									Our Vision
								</Typography>
								<Typography variant="body2" color="text.secondary">
									To see the members of CHapel of Peace FUW be so Passionate
									about God¹s heart for the lost that they have become
									Proficient in ministry skills and are Pro-actively involved in
									strategic outreach ministries locally, nationally and globally
								</Typography>
							</CardContent>
						</CardActionArea>
					</Card>
				</Grid>
				<Grid item xs={12} sm={12} md={4}>
					<Card sx={{ maxWidth: 350, minHeight: 400 }}>
						<CardActionArea>
							<CardMedia
								component="img"
								height="200"
								image="https://img.freepik.com/free-vector/illustration-business-mission_53876-26964.jpg?w=826&t=st=1666194036~exp=1666194636~hmac=b4b0488419f6df099891efd267a3cf84ff0b0e3bc83fe8a5e008b0466bb4e31a"
								alt="green iguana"
							/>
							<CardContent>
								<Typography gutterBottom variant="h5" component="div">
									Our Mission
								</Typography>
								<Typography variant="body2" color="text.secondary">
									To serve Jesus as we Motivate, Equip and Involve all segments
									of the congregation at Federal University Wukari in local,
									national and global outreach.
								</Typography>
							</CardContent>
						</CardActionArea>
					</Card>
				</Grid>

				<Grid item xs={12} sm={12} md={4}>
					<Card sx={{ maxWidth: 350, minHeight: 400 }}>
						<CardMedia
							component="img"
							height="200"
							image="https://img.freepik.com/free-vector/flat-design-church-building-illustration_23-2149441679.jpg?w=2000"
							alt="green iguana"
						/>
						<CardContent>
							<Typography
								gutterBottom
								variant="h5"
								component="div"
								// style={{ marginTop: "20px" }}
							>
								Join Us
							</Typography>
							<Typography variant="body2" color="text.secondary">
								Becoming a community in Christ ... reaching our world for
								Christ.
							</Typography>
						</CardContent>
						<CardActions
							sx={{
								alignItems: "center",
								alignContent: "center",
								justifyContent: "center",
							}}
						>
							<Button
								variant="contained"
								size="small"
								color="primary"
								align="center"
								onClick={() => navigate("/membership")}
							>
								Membership
							</Button>
						</CardActions>
					</Card>
				</Grid>
			</Grid>

			<Grid
				container
				columns={12}
				style={{
					backgroundColor: "#f1f1f1",
					justifyContent: "center",
					alignItems: "center",
					paddingTop: 50,
				}}
			>
				<Box
					justifyContent="center"
					alignContent="center"
					margin="auto"
					// padding="50px"
				>
					<Typography
						gutterBottom
						variant="h4"
						component="div"
						paddingBottom={5}
						paddingTop={5}
						justifyContent="center"
						align="center"
					>
						Weekly Events
					</Typography>
					<EventsWidget />
				</Box>

				{/* <Grid item md={4}>
					<Card sx={{ minWidth: "300" }}>
						<Typography gutterBottom variant="h5" component="div">
							Live Streaming Link
						</Typography>
						<Button size="medium">Join Now!</Button>

						<CardMedia
							component="video"
							height="250"
							image="https://www.youtube.com/embed/_v_TF8t3uOw"
							title="Live Streaming"
							controls
						/>
					</Card>
				</Grid> */}
			</Grid>
		</>
	);
}

export default MoreInfo;
