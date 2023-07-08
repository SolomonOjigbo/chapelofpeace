import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid"; // Grid version 1
import Button from "@mui/material/Button";
import {
	Box,
	Card,
	CardContent,
	Input,
	TextField,
	Typography,
} from "@mui/material";
import Axios from "../config";
import Swal from "sweetalert2";
import { validateEmail } from "../utils";

function Contact() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [subject, setSubject] = useState("");
	const [content, setContent] = useState("");
	const [loading, setLoading] = useState(false);

	const clearInput = () => {
		setName("");
		setEmail("");
		setSubject("");
		setContent("");
	};

	const handleNameInput = (e) => {
		setName(e.target.value);
	};

	const handleEmailInput = (e) => {
		setEmail(e.target.value);
	};

	const handleSubjectInput = (e) => {
		setSubject(e.target.value);
	};

	const handlecontentInput = (e) => {
		setContent(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			let isError = false;
			if (name.trim() === "") {
				return Swal.fire({
					text: "Please enter your full name",
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}
			if (!validateEmail(email.trim())) {
				return Swal.fire({
					text: "Please enter a valid email address",
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}
			if (subject.trim() === "") {
				return Swal.fire({
					text: "Please enter a subject",
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}
			if (content.trim() === "") {
				return Swal.fire({
					text: "Please enter your content",
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}
			if (isError) return false;
			setLoading(true);
			const body = {
				name,
				email,
				subject,
				content,
			};
			await Axios.post("/contact-us", body);
			clearInput();
			setLoading(false);
			Swal.fire({
				text: "Contact data sent successfully",
				icon: "success",
				animation: true,
				confirmButtonColor: "#0000FF",
			});
		} catch (error) {
			setLoading(false);
			Swal.fire({
				text: "An error occured",
				icon: "error",
				animation: true,
				confirmButtonColor: "#0000FF",
			});
			// setMessage(error.message)
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
						<strong>CONTACT</strong>
					</Typography>
				</section>
			</header>
			<Grid
				container
				direction="row"
				columns={12}
				justifyContent="center"
				alignItems="center"
				align="center"
				backgroundColor="#f7f7f7"
			>
				<Typography
					variant="h4"
					className="text-center mb-5 allTitles"
					style={{ marginTop: "140px" }}
				>
					GET IN TOUCH
				</Typography>

				{/**1st Card**/}

				<Grid
					container
					gap={2}
					columns={12}
					justifyContent="center"
					alignItems="center"
					align="center"
					sx={{ mb: "50px" }}
				>
					<Grid
						item
						md={3}
						direction="column"
						justifyContent="center"
						align="center"
					>
						<Card sx={{ width: 350, padding: "50px" }}>
							<CardContent>
								<i className="fa fa-map-marker fa-6 fa-3x" />
								<Typography variant="h5" gutterBottom>
									<b>Address</b>
								</Typography>
								<br />
								<Typography variant="h6">Chapel of Peace</Typography>
								<br />
								<Typography variant="h6">
									Federal University Wukari, P.M.B 1020 Katsina-Ala Road Wukari,
									Taraba State, Nigeria
								</Typography>
							</CardContent>
						</Card>
					</Grid>

					{/**Card 2**/}

					<Grid
						item
						md={3}
						direction="column"
						justifyContent="center"
						align="center"
					>
						<Card sx={{ width: 350, padding: "50px" }}>
							<CardContent>
								<i className="fa fa-phone fa-6 fa-3x" />
								<Typography variant="h5" gutterBottom>
									<b>Phone</b>
								</Typography>
								<br />
								<Typography
									variant="h6"
									// sx={{ fontSize: 20 }}
									gutterBottom
								>
									<b>Secretary</b>
								</Typography>
								<Typography variant="h6">+2348030000000</Typography>

								<Typography variant="h6">
									<b>Chairman</b>
								</Typography>
								<Typography variant="h6">+2348030000000</Typography>

								<Typography variant="h6">
									<b>Chaplain</b>
								</Typography>
								<Typography variant="h6">+2348030000000</Typography>
							</CardContent>
						</Card>
					</Grid>

					{/**Card 2**/}

					<Grid item direction="column" align="center" md={3}>
						<Card sx={{ width: 350, padding: "50px" }}>
							<CardContent>
								<i className="fa fa-envelope-o fa-6 fa-3x" />
								<Typography variant="h5" gutterBottom>
									<b>Email</b>
								</Typography>
								<br />
								<Typography variant="h6">
									<b>Secretary</b>
								</Typography>
								<Typography variant="h6">info@chapelofpeace.org</Typography>
								<Typography variant="h6">
									<b>Chairman</b>
								</Typography>
								<Typography variant="h6">chairman@chapelofpeace.org</Typography>
								<Typography variant="h6">
									<b>Chaplain</b>
								</Typography>
								<Typography variant="h6">chaplain@chapelofpeace.org</Typography>
							</CardContent>
						</Card>
					</Grid>
				</Grid>

				<Box
					component="form"
					sx={{
						padding: "15px",
						maxWidth: "800px",
						alignContent: "center",
						justifyContent: "center",
						alignItems: "center",
						margin: "auto",
					}}
					backgroundColor="#ffffff"
				>
					<Grid item xs={12} sm={12} marginTop={5}>
						<Typography align="center" variant="h4" className="mb-2 mt-5">
							<b>Message Us:</b>
						</Typography>
					</Grid>

					<Grid
						item
						xs={12}
						sm={12}
						md={9}
						align="center"
						sx={{ mb: 3, padding: "20px" }}
						direction="column"
						justify="center"
						alignItems="center"
					>
						<TextField
							fullWidth
							required
							id="fullName"
							label="Full Name"
							name="fullName"
							className=""
							margin="normal"
							value={name}
							onChange={handleNameInput}
						/>

						<TextField
							fullWidth
							required
							id="email"
							label="Email"
							name="email"
							className=""
							margin="normal"
							value={email}
							onChange={handleEmailInput}
						/>

						<TextField
							fullWidth
							required
							id="subject"
							label="Subject"
							name="subject"
							className=""
							margin="normal"
							value={subject}
							onChange={handleSubjectInput}
						/>

						<Input
							fullWidth
							required
							id="contents"
							label="contents"
							name="contents"
							className="bordered form-control mt-3"
							margin="normal"
							multiline
							style={{ height: "100px", width: "100%" }}
							placeholder="contents"
							value={content}
							onChange={handlecontentInput}
						/>

						<Grid
							container
							direction="row"
							spacing={2}
							style={{ marginTop: 20 }}
						>
							<Grid item>
								<Button
									variant="contained"
									size="small"
									color="warning"
									onClick={clearInput}
								>
									Reset
								</Button>
							</Grid>
							<Grid item>
								<Button
									variant="contained"
									size="small"
									color="success"
									onClick={handleSubmit}
								>
									Send
								</Button>
							</Grid>
						</Grid>
					</Grid>
				</Box>
			</Grid>
		</>
	);
}

export default Contact;
