import React, { useState, useEffect } from "react";
import Axios from "../config";
import { Box, Grid, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

const SinglePost = () => {
	const location = useLocation();

	const [post, setPost] = useState();
	const id = location.pathname.split("/:")[1];
	console.log("id: ", id);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const res = await Axios.get(`/post/${id}`);
			setPost(res.data.data);
			console.log(res.data);
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<>
			<header className="unitHeader">
				<section className="hero-header">
					<Typography
						variant="h3"
						className="text-center mb-5 allTitles"
						style={{ marginTop: "150px", color: "white" }}
					>
						<strong>Blog</strong>
					</Typography>
				</section>
			</header>
			<Grid
				container
				columns={10}
				style={{ padding: "150px" }}
				sx={{ mx: "auto" }}
				justifyContent="center"
				alignItems="center"
				margin="auto"
			>
				<Box xs={12} sm={12} justifyContent="center" alignItems="center">
					<Typography gutterBottom variant="h4" component="div">
						{post?.title}
					</Typography>
					<div>
						<img src={post?.photo} alt="" width="500px" />
					</div>
					<Typography variant="body2" color="text.secondary">
						<p
							dangerouslySetInnerHTML={{
								__html: post?.content,
							}}
						></p>
					</Typography>
				</Box>
			</Grid>
		</>
	);
};

export default SinglePost;
