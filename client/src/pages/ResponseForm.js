import React, { useEffect, useState } from "react";
import Input from "@mui/material/Input";
import {
	Button,
	Grid,
	TextField,
	Typography,
	Checkbox,
	Box,
} from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import Swal from "sweetalert2";
import Axios from "../config";

function ResponseForm() {
	const [phone_no, setPhone] = useState("");
	const [sex, setSex] = useState("male");
	const [marital_status, setMaritalStatus] = useState("single");
	const [status, setStatus] = useState("student");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [name, setName] = useState("");
	const [department, setDepartment] = useState("");
	const [level, setLevel] = useState("");
	const [hostel_name, setHostelName] = useState("");
	const [room_number, setRoomNumber] = useState("");
	const [residential_address, setResidentialAddress] = useState("");
	const [reason, setReason] = useState("");
	const [prayer_point, setPrayerPoint] = useState("");

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const handlePhoneChange = (e) => {
		setPhone(e);
	};

	const clearInput = () => {
		setLastName("");
		setPhone("");
		setMaritalStatus("");
		setLevel("");
		setSex("");
		setHostelName("");
		setRoomNumber("");
		setResidentialAddress("");
		setReason("");
		setPrayerPoint("");
		setDepartment("");
		setFirstName("");
		setStatus("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (firstName.trim() === "" || lastName.trim() === "") {
				return Swal.fire({
					text: "Please enter your full name",
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}

			if (phone_no.trim() === "") {
				return Swal.fire({
					text: "Please enter your phone number",
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}

			if (department.trim() === "") {
				return Swal.fire({
					text: "Please enter your department",
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}

			if (level.trim() === "") {
				return Swal.fire({
					text: "Please enter your level",
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}

			if (hostel_name.trim() === "") {
				return Swal.fire({
					text: "Please enter your name",
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}

			if (room_number.trim() === "") {
				return Swal.fire({
					text: "Please enter your room number",
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}

			if (reason.trim() === "") {
				return Swal.fire({
					text: "Please enter your ",
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}

			if (prayer_point.trim() === "") {
				return Swal.fire({
					text: "Please enter your prayer point",
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}

			const fullName = `${firstName} ${lastName}`;
			setName(fullName);
			const body = {
				name,
				sex,
				marital_status,
				phone_no,
				status,
				department,
				level,
				hostel_name,
				room_number,
				residential_address,
				reason,
				prayer_point,
			};
			await Axios.post("/response", body);
			clearInput();
			Swal.fire({
				text: "Response data sent successfully",
				icon: "success",
				animation: true,
				confirmButtonColor: "#0000FF",
			});
			window.scrollTo(0, 0);
		} catch (error) {
			console.log(error);
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
						<strong>RESPONSE FORM</strong>
					</Typography>
					<Typography
						variant="h5"
						className="text-center mb-5 allTitles"
						color="white"
					>
						<strong>
							Jesus said, "I am the way the truth and the life, no one goes to
							the Father except through me
						</strong>
					</Typography>
				</section>
			</header>
			<Box
				component="form"
				sx={{
					padding: "15px",
					border: "1px dashed grey",
					maxWidth: "800px",
					alignContent: "center",
					justifyContent: "center",
					alignItems: "center",
					margin: "auto",
				}}
			>
				<Grid
					container
					spacing={1}
					columns={12}
					justifyContent="center"
					alignItems="center"
					sx={{
						padding: "40px",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Grid item xs={12} sm={12} md={12} lg={12}>
						<label>Full Name:</label>

						<TextField
							fullWidth
							required
							id="firstName"
							label="First Name"
							name="firstName"
							margin="normal"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
						/>

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

						<label>Sex:</label>
						<Grid container direction="row" spacing={2}>
							<Grid item>
								<Checkbox
									checked={sex === "male"}
									onChange={() => setSex("male")}
								/>
								<label className="form-check-label" for="male">
									Male
								</label>
							</Grid>
							<Grid item>
								<Checkbox
									checked={sex === "female"}
									onChange={() => setSex("female")}
								/>
								<label className="form-check-label" for="female">
									Female
								</label>
							</Grid>
						</Grid>

						<label className="mt-3">Marital Status:</label>
						<Grid container direction="row" spacing={4}>
							<Grid item>
								<Checkbox
									checked={marital_status === "single"}
									onChange={() => setMaritalStatus("single")}
								/>
								<label className="form-check-label" for="single">
									Single
								</label>
							</Grid>
							<Grid item>
								<Checkbox
									checked={marital_status === "married"}
									onChange={() => setMaritalStatus("married")}
								/>
								<label className="form-check-label" for="married">
									Married
								</label>
							</Grid>
							<Grid item>
								<Checkbox
									checked={marital_status === "widowed"}
									onChange={() => setMaritalStatus("widowed")}
								/>
								<label className="form-check-label" for="widowed">
									Widowed
								</label>
							</Grid>
							<Grid item>
								<Checkbox
									checked={marital_status === "divorced"}
									onChange={() => setMaritalStatus("divorced")}
								/>
								<label className="form-check-label" for="divorced">
									Divorced
								</label>
							</Grid>
						</Grid>
						<label className="mt-3">Phone Number:</label>
						<MuiTelInput
							value={phone_no}
							onChange={handlePhoneChange}
							className="form-control mt-3"
							placeholder="Phone Number (+234)"
						/>

						<label className="mt-3">What best describes you?:</label>
						<Grid container direction="row" spacing={3}>
							<Grid item>
								<Checkbox
									checked={status === "student"}
									onChange={() => setStatus("student")}
								/>
								<label className="form-check-label" for="student">
									Student
								</label>
							</Grid>
							<Grid item>
								<Checkbox
									checked={status === "staff"}
									onChange={() => setStatus("staff")}
								/>
								<label className="form-check-label" for="staff">
									Staff
								</label>
							</Grid>
							<Grid item>
								<Checkbox
									checked={status === "other"}
									onChange={() => setStatus("other")}
								/>
								<label className="form-check-label" for="other">
									Other
								</label>
							</Grid>
						</Grid>

						<label className="mt-4">Department:</label>

						<Input
							type="text"
							label="Department"
							id="department"
							name="department"
							className="bordered form-control"
							placeholder="Department"
							value={department}
							onChange={(e) => setDepartment(e.target.value)}
						/>

						<label className="mt-4">Level:</label>

						<Input
							type="text"
							label="Level"
							id="level"
							name="level"
							className="bordered form-control"
							placeholder="Level"
							value={level}
							onChange={(e) => setLevel(e.target.value)}
						/>

						<label className="mt-4">If in hostel, hostel name?:</label>

						<Input
							type="text"
							label="Hostel Name"
							id="hostelName"
							name="hostelName"
							className="bordered form-control"
							placeholder="Hostel Name"
							value={hostel_name}
							onChange={(e) => setHostelName(e.target.value)}
						/>

						<label className="mt-4">Room Number:</label>

						<Input
							type="number"
							required
							id="roomNumber"
							label="Room Number"
							name="roomNumber"
							margin="normal"
							className="bordered form-control mt-4"
							inputProps={{ maxLength: 12 }}
							placeholder="Room Number"
							value={room_number}
							onChange={(e) => setRoomNumber(e.target.value)}
						/>

						<label className="mt-4">
							If off campus, your residential address?:
						</label>

						<Input
							type="text"
							label="Residential Address"
							id="residentialAddress"
							name="residentialAddress"
							className="bordered form-control"
							placeholder="Residential Address"
							style={{ height: "150px" }}
							value={residential_address}
							onChange={(e) => setResidentialAddress(e.target.value)}
						/>

						<label className="mt-4">Reason(s) for your response:</label>

						<Input
							type="text"
							label="Reason for your response"
							id="reasonForResponse"
							name="reasonForResponse"
							className="bordered form-control"
							placeholder="Reason for your response"
							style={{ height: "100px", width: "100%" }}
							value={reason}
							onChange={(e) => setReason(e.target.value)}
						/>

						<label className="mt-4">Prayer Point(s):</label>

						<Input
							type="text"
							label="Prayer Point(s)"
							id="prayerPoints"
							name="prayerPoints"
							className="bordered form-control"
							placeholder="Prayer Point(s)"
							style={{ height: "100px", width: "100%" }}
							value={prayer_point}
							onChange={(e) => setPrayerPoint(e.target.value)}
						/>

						<Button
							variant="contained"
							size="small"
							color="primary"
							className="mt-4 mb-4"
							onClick={handleSubmit}
						>
							Submit
						</Button>
					</Grid>
				</Grid>
			</Box>
		</>
	);
}

export default ResponseForm;
