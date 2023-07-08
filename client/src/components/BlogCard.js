import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Truncate from "react-truncate-html";

const BlogCard = ({ post }) => {
	return (
		<Box
			display="flex"
			flexDirection="row"
			padding="20px"
			// alignContent="center"
			// justifyContent="center"
		>
			<Card sx={{ minWidth: "300px", minHeight: "400px" }}>
				<CardMedia
					component="img"
					height="200"
					image={post.photo}
					alt="blog post"
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{post.title}
					</Typography>

					<Typography variant="body2" color="text.secondary">
						<Truncate
							lines={3}
							dangerouslySetInnerHTML={{
								__html: post.content,
							}}
						/>
					</Typography>
				</CardContent>
				<CardActions sx={{ alignItem: "center" }}>
					<Link to={`/single-post/:${post.id}`}>
						<Button variant="outline" size="small">
							Read More
						</Button>
					</Link>
				</CardActions>
			</Card>
		</Box>
	);
};

export default BlogCard;
