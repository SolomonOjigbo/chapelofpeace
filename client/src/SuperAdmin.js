import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useEffect } from "react";

export const SuperAdmin = ({ children }) => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	const userData = useSelector(selectUser);
	const navigate = useNavigate();
	const { user } = userData.user;
	console.log(user);
	const handleClick = () => {
		navigate("/dashboard");
	};
	if (user.role === "Super Admin") return children;
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				height: "50vh",
			}}
			className="mt-3 mb-3"
		>
			<h3> "You are not authorised to view this resource!"</h3>
			<Button
				variant="contained"
				onClick={handleClick}
				style={{
					height: 50,
					width: 150,
				}}
			>
				Return to Dashboard
			</Button>
		</div>
	);
};
