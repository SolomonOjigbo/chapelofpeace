import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import LockIcon from "@mui/icons-material/Lock";

import { FileUploader } from "react-drag-drop-files";
import {
	MenuItem,
	Select,
	InputLabel,
	FormControl,
	Typography,
	Avatar,
	CssBaseline,
	Button,
	Grid,
	Container,
	TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Axios from "../config";
import Swal from "sweetalert2";
import { validateEmail } from "../utils";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
	"@global": {
		body: {
			backgroundColor: "white",
		},
	},
	paper: {
		marginTop: 8,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		paddingTop: "30px",
		paddingBottom: "20px",
	},
	avatar: {
		margin: "10px",
		backgroundColor: "#33c9dc",
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: "30px",
	},
	submit: {
		margin: "30px 0 20px",
	},
}));

export default function SignUp() {
	const classes = useStyles();
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [file, setFile] = useState("");

	const [role, setRole] = useState("");
	const fileTypes = ["JPEG", "JPG", "PNG", "GIF"];

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const handleUploadFileChange = async (file) => {
		setFile(file);
	};

	const handleRoleChange = (event) => {
		setRole(event.target.value);
		console.log("role", role);
	};

	const clearInput = () => {
		setLastName("");
		setFirstName("");
		setEmail("");
		setUsername("");
		setPassword("");
		setFile(null);
		setRole("");
	};

	const uploadFile = async () => {
		try {
			const formData = new FormData();
			formData.append("file", file);
			formData.append("upload_preset", "c0qsbdxg");
			formData.append("cloud_name", "ddsaeli9q");
			const res = await axios.post(
				"https://api.cloudinary.com/v1_1/ddsaeli9q/image/upload",
				formData
			);
			console.log(res.data);
			return res.data.secure_url;
		} catch (err) {
			console.log(err);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const imgUrl = await uploadFile();
		try {
			if (firstName.trim() === "" || lastName.trim() === "") {
				return Swal.fire({
					text: "Please enter your full name",
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}

			if (!validateEmail(email)) {
				return Swal.fire({
					text: "Please enter a valid email address",
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}

			if (role.trim() === "") {
				return Swal.fire({
					text: "Please select your Role",
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}
			if (file === null) {
				return Swal.fire({
					text: "Please select your Photo",
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

			const body = {
				email,
				username,
				name: `${firstName} ${lastName}`,
				password,
				role,
				photo: imgUrl,
			};
			const response = await Axios.post("/user", body);
			const data = response.data;
			localStorage.setItem("_c_user", JSON.stringify(data.data));
			localStorage.setItem("token", JSON.stringify(data.token));
			clearInput();
			Swal.fire({
				text: "User Registered Successfully",
				icon: "success",
				animation: true,
				confirmButtonColor: "#0000FF",
			}).then(() => {
				window.scrollTo(0, 0);
				window.location.href = "/dashboard";
			});
		} catch (error) {
			Swal.fire({
				text: `${error.response.data.message}`,
				icon: "error",
				animation: true,
				confirmButtonColor: "#0000FF",
			});
			console.log(error);
		}
	};
	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete="fname"
								name="firstName"
								variant="outlined"
								required
								fullWidth
								id="firstName"
								label="First Name"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
								autoFocus
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="lastName"
								label="Last Name"
								name="lastName"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
								autoComplete="lname"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								value={email}
								autoComplete="email"
								onChange={(e) => setEmail(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<InputLabel id="demo-simple-select-label">Role</InputLabel>
							<FormControl fullWidth>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={role}
									label="Role"
									onChange={handleRoleChange}
								>
									<MenuItem className="ml-4 mt-2" value={"User"}>
										User
									</MenuItem>
									<MenuItem className="ml-4 mt-2" value={"Admin"}>
										Admin
									</MenuItem>
									<MenuItem className="ml-4 mt-2" value={"Super Admin"}>
										Super Admin
									</MenuItem>
									<br />
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="username"
								label="Username"
								name="username"
								autoComplete="username"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<label>Upload Photo:</label>
							<FileUploader
								multiple={false}
								handleChange={handleUploadFileChange}
								name="file"
								className="form-control"
								types={fileTypes}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
						disabled={
							!firstName ||
							!lastName ||
							!email ||
							!role ||
							!username ||
							!file ||
							!password
						}
					>
						Sign Up
					</Button>
					<Grid container justify="flex-end">
						<Grid item xs={12} lg={12} sm={12} md={12} sx={{ mb: 5 }}>
							<Link to="/login" variant="body2">
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
}
