import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import useSWRInfinite from "swr/infinite";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import required modules
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper";
import { CardMedia, Box } from "@mui/material";
import { getSlidersSWRCursor } from "../lib/sliders";

function AboutUsSlider() {
	const PAGE_SIZE = 25;
	const getKey = (pageIndex, previousPageData) => {
		//if no user or reached the end, do not fetch
		if (previousPageData && !previousPageData.data) return null;

		//first page, we do not
		if (pageIndex === 0)
			return { path: "/slider", cursor: 0, limit: PAGE_SIZE };

		//add the cursor to the API e
		// console.log(previousPageData.nextCursor);
		return {
			path: "/slider",
			cursor: previousPageData.nextCursor,
			limit: PAGE_SIZE,
		};
	};

	const { data, size, setSize, error, mutate } = useSWRInfinite(
		getKey,
		getSlidersSWRCursor
	);
	// const isLoading = !data && !error;
	// const isLoadingMore =
	// 	isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
	const allSliders = data
		? data.reduce((prev, curr) => [...prev, ...curr.data], [])
		: [];
	// const totalSliders = allSliders.length;
	const homeSliders = allSliders.filter((slider) => slider.page === "About");
	// const isEmpty = !data ? true : data?.[0]?.data.length === 0;
	// const isReachingEnd =
	// 	isEmpty ||
	// 	(data && data[size - 1]?.data.length < PAGE_SIZE) ||
	// 	Boolean(size > 0 && data && error);

	return (
		<>
			<Box sx={{ height: "86vh" }}>
				<Swiper
					slidesPerView={1}
					spaceBetween={10}
					effect={"fade"}
					loop={true}
					navigation={true}
					pagination={{
						clickable: true,
						type: "progressbar",
					}}
					autoplay={{
						delay: 2500,
						disableOnInteraction: false,
					}}
					modules={[Autoplay, EffectFade, Navigation, Pagination]}
					className="mySwiper "
				>
					{homeSliders.map((slider) => (
						<SwiperSlide key={slider.id}>
							<CardMedia
								component="img"
								height="100%"
								image={slider.photo}
								alt={slider.description}
							/>
						</SwiperSlide>
					))}
				</Swiper>
			</Box>
		</>
	);
}

export default AboutUsSlider;
