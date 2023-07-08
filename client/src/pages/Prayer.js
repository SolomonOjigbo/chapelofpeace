import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Grid,
	Stack,
	Typography,
} from "@mui/material";
import Input from "@mui/material/Input";
import { TextField } from "@mui/material";
import { DatePicker, Space } from "antd";
import moment from "moment";
import { Country, State, City } from "country-state-city";
import { MuiTelInput } from "mui-tel-input";
import { FileUploader } from "react-drag-drop-files";
import { validateEmail } from "../utils";
import Axios from "../config";
import Swal from "sweetalert2";
import PrayerMeetings from "../components/PrayerMeetings";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

function Prayer() {
	const [open, setOpen] = React.useState(false);
	const [phone, setPhone] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [content, setContent] = useState("");

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handlePhoneChange = (newPhone) => {
		setPhone(newPhone);
	};

	const clearInput = () => {
		setFirstName("");
		setLastName("");
		setPhone("");
		setEmail("");
		setContent("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (
				firstName.trim() === "" ||
				lastName.trim() === "" ||
				phone.trim() === "" ||
				!validateEmail(email) ||
				content.trim() === ""
			) {
				return Swal.fire({
					text: "Please enter all Prayer Request Details",
					animation: true,
					confirmButtonColor: "#0000FF",
					timer: 3000,
				});
			}
			const body = {
				name: `${firstName} ` + `${lastName}`,
				phone_no: phone,
				email,
				content,
			};
			const res = await Axios.post(`/prayer-request`, body);
			console.log("res client", res);
			clearInput();
			Swal.fire({
				text: "Prayer Requests Submitted Successfully",
				icon: "success",
				animation: true,
				confirmButtonColor: "#0000FF",
				timer: 3000,
			}).then(() => {
				window.scrollTo(0, 0);
				// window.location.reload()
			});
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
		<Box sx={{ backgroundColor: "#f2f2f3" }}>
			<header className="unitHeader">
				<section className="hero-header">
					<Typography
						variant="h3"
						className="text-center mb-5 allTitles"
						style={{ marginTop: "150px", color: "white" }}
					>
						<strong>PRAYER</strong>
					</Typography>
				</section>
			</header>
			<Grid container xs={12} sm={12} md={12} marginTop={6}>
				<Grid item sx={{ width: "100%", marginBottom: "20px" }}>
					<Typography variant="h4" className="text-center mb-3 allTitles">
						<strong>Meditation</strong>
						<br />
					</Typography>
				</Grid>
				<Grid item sx={{ width: "100%", marginBottom: "20px" }}>
					<Typography variant="h6" className="text-center mb-4">
						The bible encourages us to ...pray without ceasing. 1 Thes 5:17
					</Typography>
				</Grid>
			</Grid>
			<Grid
				container
				margin="auto"
				alignContent="center"
				alignItems="center"
				justifyContent="center"
			>
				<Typography variant="h5" style={{ color: "blue" }}>
					Weekly Prayer Meetings:
				</Typography>
			</Grid>
			<Grid
				container
				spacing={2}
				columns={12}
				justifyContent="center"
				alignItems="center"
				sx={{ align: "center", margin: "auto" }}
			>
				<PrayerMeetings />
			</Grid>

			<Grid
				container
				display="flex"
				flexDirection="column"
				spacing={1}
				columns={12}
				justifyContent="center"
				alignItems="center"
				sx={{ padding: "10px", backgroundColor: "#f7f7f7" }}
			>
				<Typography
					variant="h4"
					className="text-center mb-3 allTitles"
					style={{ marginTop: "30px" }}
				>
					<strong>Special Prayer Request:</strong>
				</Typography>
				<Grid item xs={12} sm={12} md={5} sx={{ mt: 3 }}>
					<Typography>
						Do you have an issue you would like us to pray along with you?
						Please fill the request form:
					</Typography>
					<Box backgroundColor="#fff" padding={5}>
						<label>Full Name:</label>
						<Grid container direction="row" spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									fullWidth
									required
									id="firstName"
									label="First Name"
									name="firstName"
									className=""
									margin="normal"
									value={firstName}
									onChange={(e) => setFirstName(e.target.value)}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									fullWidth
									required
									id="surname"
									label="Surname"
									name="surname"
									className="mb-3"
									margin="normal"
									value={lastName}
									onChange={(e) => setLastName(e.target.value)}
								/>
							</Grid>
						</Grid>

						<label className="mt-3">Phone Number:</label>
						<MuiTelInput
							value={phone}
							onChange={handlePhoneChange}
							className="form-control mt-3"
							placeholder="Phone Number (+234)"
						/>

						<label className="mt-4">Email:</label>
						<Input
							type="email"
							label="Email"
							id="email"
							name="email"
							className="bordered form-control"
							placeholder="Email Address"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<label className="mt-4">Comments:</label>
						<Input
							type="text"
							label="Comments"
							id="comments"
							name="comments"
							className="bordered form-control"
							placeholder="Comments"
							style={{ height: "100px", width: "100%" }}
							value={content}
							onChange={(e) => setContent(e.target.value)}
						/>
						<Button
							variant="contained"
							size="small"
							color="primary"
							className="mt-4 mb-4"
							onClick={(e) => handleSubmit(e)}
						>
							Submit
						</Button>
					</Box>
				</Grid>
			</Grid>

			<Modal open={open} onClose={handleClose}>
				<Box sx={style}>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						Join the Zoom Prayer Meeting
						<br />
						<a href="https://us04web.zoom.us/j/73164510684?pwd=jnD6SA8cXbDaK9u8NbDCVYB0GLSIUt.1">
							Click here
						</a>
					</Typography>
					<Typography id="modal-modal-description" sx={{ mt: 2 }}>
						Meeting ID: 731 6451 0684 <br />
						Passcode: B34um5
					</Typography>
				</Box>
			</Modal>
		</Box>
	);
}

export default Prayer;
