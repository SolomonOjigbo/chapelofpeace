import React, { useState, useEffect } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import { Button, Grid } from "@mui/material";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";

const BackToTopButton = () => {
	const [backToTopButton, setBackToTopButton] = useState(false);

	useEffect(() => {
		window.addEventListener("scroll", () => {
			if (window.scrollY > 100) {
				setBackToTopButton(true);
			} else {
				setBackToTopButton(false);
			}
		});
	}, []);

	const scrollUp = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};
	return (
		<Grid className="shadow-lg">
			{backToTopButton && (
				<Button
					style={{
						position: "fixed",
						bottom: "20px",
						right: "20px",
						background: "rgb(6, 93, 294)",
						color: "white",
					}}
					onClick={scrollUp}
					type="button"
					className="btn shadow-lg btn-floating btn-lg"
					id="btn-back-to-top"
				>
					{/* <FontAwesomeIcon icon="fa fa-arrow-up" size="xs" /> */}
					<ArrowCircleUpIcon />
				</Button>
			)}
		</Grid>
	);
};

export default BackToTopButton;
