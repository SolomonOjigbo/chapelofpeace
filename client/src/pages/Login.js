import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { validateEmail } from "../utils";
import Swal from "sweetalert2";
import { getUser } from "../features/api";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

const Login = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userLogin = useSelector(selectUser);
	const { user, loading } = userLogin;
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		if (user) {
			navigate("/dashboard");
		}
	}, [navigate, user]);

	const clearInput = () => {
		setEmail("");
		setPassword("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (!validateEmail(email)) {
				return Swal.fire({
					text: "Please enter a valid email address",
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}

			if (password.trim() === "") {
				return Swal.fire({
					text: "Please enter your password",
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}
			const userData = {
				email,
				password,
			};
			dispatch(getUser(userData));
			if (loading) {
				return "Loading...";
			}
			navigate("/dashboard");
			clearInput();
			Swal.fire({
				text: "Login successfull",
				icon: "success",
				animation: true,
				confirmButtonColor: "#0000FF",
			});
			// window.scrollTo(0, 0);
		} catch (error) {
			console.log(error);
			Swal.fire({
				text: `${error.response.data.message}`,
				icon: "error",
				animation: true,
				confirmButtonColor: "#0000FF",
			});
		}
	};

	return (
		<>
			<Grid
				container
				spacing={2}
				columns={12}
				justifyContent="center"
				alignItems="center"
				style={{ padding: "20px", marginTop: "100px", marginBottom: "50px" }}
			>
				<Box
					component="form"
					sx={{
						padding: "15px",
						border: "1px dashed grey",
						width: "600px",
						alignContent: "center",
						justifyContent: "center",
						alignItems: "center",
						margin: "auto",
					}}
				>
					<Typography align="center" variant="h4">
						Login
					</Typography>

					<Grid
						item
						xs={12}
						sm={12}
						md={12}
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							marginTop: "80px",
						}}
					>
						<TextField
							id="standard-basic"
							label="Email"
							variant="standard"
							sx={{ width: "70%", height: "90px" }}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</Grid>

					<Grid
						item
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<TextField
							id="outlined-password-input"
							type="password"
							label="Password"
							variant="standard"
							sx={{ width: "70%", height: "80px" }}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</Grid>

					<Grid
						item
						xs={12}
						sm={12}
						md={12}
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Button
							variant="contained"
							onClick={handleSubmit}
							disabled={!email || !password}
						>
							Login
						</Button>
					</Grid>
					<Grid item justify="flex-end">
						<Grid item xs={12} lg={12} sm={12} md={12} sx={{ mb: 5 }}>
							<Link to="/register" variant="body2">
								New User? Sign Up
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Grid>
		</>
	);
};

export default Login;
