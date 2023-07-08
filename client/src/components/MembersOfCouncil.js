import { Box, CardMedia, Grid, Typography } from "@mui/material";
import React from "react";
import Loader from "../admin/components/Loader";
import { getMembersOfCouncilSWRCursor } from "../lib/membersOfCouncil";
import useSWRInfinite from "swr/infinite";

function MembersOfCouncil() {
	const PAGE_SIZE = 5;

	const modalStyles = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 400,
		bgcolor: "background.paper",
		border: "2px solid #000",
		boxShadow: 24,
		p: 4,
		zIndex: 1,
		overflowY: "scroll !important",
		height: "80vh",
		"& .MuiDialog-paper": {
			overflowY: "scroll !important",
			height: "80vh",
		},
	};

	const getKey = (pageIndex, previousPageData) => {
		//if no user or reached the end, do not fetch
		if (previousPageData && !previousPageData.data) return null;

		//first page, we do not
		if (pageIndex === 0)
			return { path: "/members-of-council", cursor: 0, limit: PAGE_SIZE };

		//add the cursor to the API e
		console.log(previousPageData.nextCursor);
		return {
			path: "/members-of-council",
			cursor: previousPageData.nextCursor,
			limit: PAGE_SIZE,
		};
	};

	const { data, size, setSize, error, mutate } = useSWRInfinite(
		getKey,
		getMembersOfCouncilSWRCursor
	);
	const isLoading = !data && !error;
	const isLoadingMore =
		isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
	const allMembersOfCouncil = data
		? data.reduce((prev, curr) => [...prev, ...curr.data], [])
		: [];
	const totalMembersOfCouncil = allMembersOfCouncil.length;
	const isEmpty = !data ? true : data?.[0]?.data.length === 0;
	const isReachingEnd =
		isEmpty ||
		(data && data[size - 1]?.data.length < PAGE_SIZE) ||
		Boolean(size > 0 && data && error);
	console.log("allMembersOfCouncil>>>>>>", allMembersOfCouncil);
	console.log("data and size>>>>>>", data, size);

	const loadMore = (e) => {
		e.preventDefault();
		setSize((pre) => pre + 1);
	};

	if (isLoading) {
		return <Loader />;
	}

	return (
		<>
			<Box id="team" className="team_member mt-5 section-padding">
				<Typography variant="h4" sx={{ mt: 5 }} align="center">
					Members of Council
				</Typography>
				<Typography variant="h6" align="center">
					Meet the members of the Governing Council of Chapel of Peace, Federal
					University, Wukuri (FUW), Nigeria
				</Typography>
				<Grid
					container
					spacing={2}
					columns={12}
					justifyContent="center"
					alignItems="center"
					sx={{ mt: 8 }}
				>
					{allMembersOfCouncil.map((member) => (
						<Grid
							key={member.id}
							item
							xs={12}
							sm={12}
							md={2.5}
							style={{
								justifyContent: "center",
								alignItems: "center",
							}}
							className="row text-center wow fadeInUp"
							data-wow-duration="1s"
							data-wow-delay="0.1s"
							data-wow-offset="0"
						>
							<Grid className="our-team">
								<Grid className="team_img">
									<CardMedia
										component="img"
										height="250"
										width="250"
										image={member.photo}
										alt={member.name}
										sx={{ maxHeight: 300 }}
									/>

									<ul className="social">
										<li>
											<a href={member.facebook}>
												<i className="fa fa-facebook" />
											</a>
										</li>
										<li>
											<a href={member.twitter}>
												<i className="fa fa-twitter" />
											</a>
										</li>
										<li>
											<a href={member.linkedin}>
												<i className="fa fa-linkedin" />
											</a>
										</li>
										<li>
											<a href={member.instagram}>
												<i className="fa fa-instagram" />
											</a>
										</li>
									</ul>
								</Grid>
								<Grid className="team-content">
									<Typography className="title">{member.name}</Typography>
									<span className="post">{member.title}</span>
								</Grid>
							</Grid>
						</Grid>
					))}

					{/* </Grid> */}

					{/* </Grid> */}
				</Grid>
			</Box>
		</>
	);
}

export default MembersOfCouncil;
