import React, { useEffect, useMemo, useState } from "react";
import TestimonialCard from "material-testimonial-card";
import useSWRInfinite from "swr/infinite";
import { getTestimonialsSWRCursor } from "../lib/testimonial";
import { Box, Grid } from "@mui/material";
import { Button } from "antd";
import Loader from "../admin/components/Loader";

const PAGE_SIZE = 5;
function Testimonial({ isMobile }) {
	const [testimonials, setTestimonials] = useState([]);
	const getKey = (pageIndex, previousPageData) => {
		//if no user or reached the end, do not fetch
		if (previousPageData && !previousPageData.data) return null;

		//first page, we do not
		if (pageIndex === 0)
			return { path: "/testimonial", cursor: 0, limit: PAGE_SIZE };

		//add the cursor to the API e
		console.log(previousPageData.nextCursor);
		return {
			path: "/testimonial",
			cursor: previousPageData.nextCursor,
			limit: PAGE_SIZE,
		};
	};

	const { data, size, setSize, error, mutate } = useSWRInfinite(
		getKey,
		getTestimonialsSWRCursor
	);

	const isLoading = !data && !error;
	const isLoadingMore =
		isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
	const getTestimonials = useMemo(() => {
		const allTestimonial = data
			? data.reduce((prev, curr) => [...prev, ...curr.data], [])
			: [];
		// console.log("allTestimonial>>>>>>", allTestimonial);
		// console.log("data and size>>>>>>", data, size);
		return allTestimonial;
	}, [data]);
	useEffect(() => {
		setTestimonials(getTestimonials);
	}, [getTestimonials]);

	const isEmpty = !data ? true : data?.[0]?.data.length === 0;
	const isReachingEnd =
		isEmpty ||
		(data && data[size - 1]?.data.length < PAGE_SIZE) ||
		Boolean(size > 0 && data && error);

	const loadMore = (e) => {
		e.preventDefault();
		setSize((pre) => pre + 1);
	};

	return (
		<Box
			style={{
				justifyContent: "center",
				alignItems: "center",
				padding: "20px",
			}}
		>
			<>
				{isMobile ? (
					<Grid
						item
						display="flex"
						flexDirection="column"
						gap={4}
						margin="auto"
					>
						{testimonials.map((testimony) => (
							<TestimonialCard
								name={testimony.name}
								image={testimony.url}
								content={testimony.description}
								project={testimony.title}
								key={testimony.id}
								style={{ display: "column" }}
							/>
						))}
					</Grid>
				) : (
					<Grid item display="flex" flexDirection="row" gap={4} margin="auto">
						{testimonials.map((testimony) => (
							<TestimonialCard
								name={testimony.name}
								image={testimony.url}
								content={testimony.description}
								project={testimony.title}
								key={testimony.id}
								className="flex"
							/>
						))}
					</Grid>
				)}
			</>
			{
				<Button
					variant="contained"
					disabled={isReachingEnd || isLoadingMore}
					onClick={(e) => loadMore(e)}
				>
					{isLoadingMore && !isReachingEnd ? (
						<Loader />
					) : isReachingEnd ? (
						"No more data"
					) : (
						"Load more"
					)}
				</Button>
			}
		</Box>
	);
}

export default Testimonial;
