import React from "react";
import { CircularProgress } from "@mui/material";

const Loader = () => {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "30px",
			}}
			className="mt-3 mb-3"
		>
			<CircularProgress size={50} />
		</div>
	);
};

export default Loader;
