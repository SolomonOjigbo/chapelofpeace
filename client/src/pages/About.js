import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
// import { styled } from "@mui/material/styles";

import React, { useEffect } from "react";
// import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";
import AboutUsSlider from "../components/AboutUsSlider";
import MembersOfCouncil from "../components/MembersOfCouncil";
import BoardOfTrustees from "../components/BoardOfTrustees";

function About() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	// const Img = styled("img")({
	// 	margin: "auto",
	// 	display: "block",
	// 	maxWidth: "100%",
	// 	maxHeight: "100%",
	// });
	return (
		<>
			<AboutUsSlider />
			<Grid
				container
				spacing={2}
				columns={12}
				justifyContent="center"
				alignItems="center"
				style={{ padding: "50px" }}
			>
				<Typography
					variant="h4"
					className="text-center allTitles"
					sx={{ marginTop: "30px", mb: 3 }}
				>
					About Chapel of Peace FUW
				</Typography>
				<Grid
					container
					spacing={2}
					columns={12}
					gap={1}
					justifyContent="center"
					alignItems="center"
					sx={{ mx: "auto" }}
				>
					<Grid
						item
						xs={12}
						sm={12}
						md={5}
						// style={{
						// 	display: "flex",
						// 	justifyContent: "center",
						// 	alignItems: "center",
						// }}
					>
						<Card sx={{ mb: 4 }}>
							<CardMedia
								component="img"
								height="260"
								image="https://res.cloudinary.com/ddsaeli9q/image/upload/v1681381538/q2ul9gqwwkacpwufavxjsa_ldqhmq.jpg"
								alt="About Chapel of Peace"
							/>
							<CardContent>
								<Typography variant="h5" component="div">
									Our Vision and Mission
								</Typography>

								<Typography variant="body2">
									To see the members of Chapel of Peace Federal University
									Wukari, Nigeria be so Passionate about God¹s heart for the
									lost that they have become Proficient in ministry skills and
									are Pro-actively involved in strategic outreach ministries
									locally, nationally and globally. To serve Jesus as we
									Motivate, Equip and Involve all segments of the congregation
									at Chapel of Peace FUW in local, national and global outreach.
								</Typography>
							</CardContent>
						</Card>
					</Grid>
					<Grid item md={6} xs={12} sm={12}>
						<Card sx={{ mb: 4 }}>
							<CardMedia
								component="img"
								height="250"
								image="https://res.cloudinary.com/ddsaeli9q/image/upload/v1681651043/chapelofpeacce/vktskqwwgenbjwgs1u5x.jpg"
								alt="Our History"
							/>
							<CardContent>
								<Typography gutterBottom variant="h5" component="div">
									Brief History
								</Typography>
								<Typography variant="body2" color="text.secondary">
									Chapel of Peace FUW Our vision is to become a Biblically
									rooted and culturally sensitive church moved by a Great
									Commission Vision which equips and enables men and women to
									communicate Christ through significant relationships with God,
									with one another as believers ad with non-believers. Our
									vision is to see God mature us into a local community of
									believers committed to serving those within the community of
									believers and seeking those outside the community of
									believers, both locally and globally, with character,
									compassion, courage and creativity. Sloganized as: “Becoming a
									community in Christ ... reaching our world for Christ.”
								</Typography>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</Grid>
			<Grid>
				<Grid
					container
					style={{
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<header className="unitHeader">
						<section className="hero-header">
							<Typography
								variant="h3"
								className="text-center mb-5 allTitles"
								style={{ marginTop: "50px", color: "white" }}
							>
								<strong>Our Belief</strong>
							</Typography>
							<Typography
								variant="body2"
								style={{ marginBottom: "50px", color: "white" }}
							>
								We tend to Glorify God by mobilizing the resources entrusted to
								Chapel of Peace FUW for the fulfillment of Christ’s commission
								to make disciples in all nations.
							</Typography>
						</section>
					</header>
				</Grid>
			</Grid>
			<MembersOfCouncil />
			<BoardOfTrustees />
		</>
	);
}

export default About;
