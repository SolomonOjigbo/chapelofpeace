import React from "react";
import Grid from "@mui/material/Grid";
import { Typography, Link } from "@mui/material";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

function SocialCard() {
	return (
		<>
			<hr className="m-0" />

			<Grid
				container
				spacing={2}
				columns={12}
				justifyContent="center"
				className="text-center py-4 align-items-center"
				gap={2}
			>
				<Grid item>
					<Typography>Follow Chapel of Peace FUW on social media</Typography>
				</Grid>
				<Grid>
					<Link
						href="https://www.youtube.com/watch?v=F7lfySdDsv8"
						underline="hover"
						className="btn btn-primary m-1"
						style={{ color: "white" }}
						role="button"
						rel="nofollow"
						target="_blank"
					>
						<YouTubeIcon />
					</Link>
					<Link
						href="https://web.facebook.com/Chapelofpeacefuw"
						underline="hover"
						style={{ color: "white" }}
						className="btn btn-primary m-1"
						role="button"
						rel="nofollow"
						target="_blank"
					>
						<FacebookIcon />
					</Link>
					<Link
						href="https://twitter.com/danhard1/status/673479859688087552"
						className="btn btn-primary m-1"
						style={{ color: "white" }}
						role="button"
						rel="nofollow"
						target="_blank"
					>
						<TwitterIcon />
					</Link>
					<Link
						href="https://www.instagram.com/explore/locations/2466627233558926/chapel-of-peace-federal-university-wukari-taraba-state/"
						underline="hover"
						className="btn btn-primary m-1"
						style={{ color: "white" }}
						role="button"
						rel="nofollow"
						target="_blank"
					>
						<InstagramIcon />
					</Link>
				</Grid>
			</Grid>
		</>
	);
}

export default SocialCard;
