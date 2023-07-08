import React, { useEffect, useState } from "react";
import Input from "@mui/material/Input";
import {
	Box,
	Button,
	Checkbox,
	Grid,
	TextField,
	Typography,
} from "@mui/material";
import { DatePicker } from "antd";
import { Country, State, City } from "country-state-city";
import { MuiTelInput } from "mui-tel-input";
import { FileUploader } from "react-drag-drop-files";
import Swal from "sweetalert2";
import { validateEmail } from "../utils";
import Axios from "../config";
import axios from "axios";

function AlumniMembership() {
	const [country, setCountry] = useState("");
	const [countryCode, setCountryCode] = useState("");
	const [city, setCity] = useState("");
	const [cities, setCities] = useState([]);
	const [state, setState] = useState("");
	const [states, setStates] = useState([]);
	const [phone_no, setPhone] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [sex, setSex] = useState("male");
	const [marital_status, setMaritalStatus] = useState("single");
	const [no_of_children, setChildrenNo] = useState("");
	const [email, setEmail] = useState("");
	const [contact_address, setContactAddress] = useState("");
	const [residential_address, setResidentialAddress] = useState("");
	const [permanent_address, setPermanentAddress] = useState("");

	const [type_of_membership, setMembershipType] = useState("student");
	const [department, setDepartment] = useState("");
	const [faculty, setFaculty] = useState("");
	const [date_of_birth, setDateOfBirth] = useState(null);
	const [year_of_graduation, setYearOfGraduation] = useState(null);
	const [service_unit, setServiceUnit] = useState("");
	const [content, setContent] = useState("");
	const [file, setFile] = useState(null);
	const fileTypes = ["JPEG", "JPG", "PNG", "GIF", "WEBP"];

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	const handleUploadFileChange = (file) => {
		setFile(file);
	};

	const handleDateOfBirthChange = (date, dateString) => {
		setDateOfBirth(dateString);
	};
	const handleYearOfGraduationDateChange = (date, dateString) => {
		setYearOfGraduation(dateString);
	};

	const filterCountries = Country.getAllCountries();
	const handleCountryInput = (code) => {
		try {
			setCountryCode(code);
			const filterCountry = filterCountries.find((c) => c.isoCode === code);
			setCountry(filterCountry.name);
			const _states = State.getAllStates();
			let filterStates = _states.filter((s) => s.countryCode === code);
			if (code === "GB") {
				const _allowedStates = [
					"England",
					"Wales",
					"Scotland",
					"Northern Ireland",
				];
				filterStates = filterStates.filter((s) =>
					_allowedStates.includes(s.name)
				);
			}
			filterStates = filterStates.sort(
				(a, b) => a.name.toLowerCase() - b.name.toLowerCase()
			);
			setStates(filterStates);
			setCities([]);
		} catch (error) {}
	};

	const handleStateInput = (code) => {
		const _states = State.getAllStates();
		let filterState = _states.find(
			(s) => s.isoCode === code && s.countryCode === countryCode
		);
		setState(filterState.name);
		const _cities = City.getCitiesOfState(countryCode, code);
		setCities(_cities);
	};

	const handleCityInput = (e) => {
		setCity(e.target.value);
	};

	const handlePhoneChange = (newPhone) => {
		setPhone(newPhone);
	};

	const clearInput = () => {
		setFirstName("");
		setLastName("");
		setSex("");
		setMaritalStatus("");
		setChildrenNo("");
		setDateOfBirth(null);
		setCountry("");
		setState("");
		setCity("");
		setEmail("");
		setPhone("");
		setContactAddress("");
		setResidentialAddress("");
		setMembershipType("");
		setDepartment("");
		setFaculty("");
		setPermanentAddress("");
		setYearOfGraduation(null);
		setServiceUnit("");
		setContent("");
		setFile(null);
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
		const imgUrl = await uploadFile();
		e.preventDefault();
		try {
			if (firstName.trim() === "" || lastName.trim() === "") {
				return Swal.fire({
					text: "Please enter your full name",
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}

			if (sex.checked === false) {
				return Swal.fire({
					text: "Please select your Gender",
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}

			if (marital_status.checked === false) {
				return Swal.fire({
					text: "Please select your Marital Status",
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}

			if (no_of_children.trim() === "") {
				return Swal.fire({
					text: "Please enter number of children",
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}
			if (date_of_birth === null) {
				return Swal.fire({
					text: "Please enter your date of birth",
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}

			if (country.trim() === "") {
				return Swal.fire({
					text: "Please select your country",
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}
			if (state.trim() === "") {
				return Swal.fire({
					text: "Please select your state",
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}

			if (city.trim() === "") {
				return Swal.fire({
					text: "Please select your city",
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

			if (phone_no.trim() === "") {
				return Swal.fire({
					text: "Please enter your phone number",
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}
			if (contact_address.trim() === "") {
				return Swal.fire({
					text: "Please enter your contact address",
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}

			if (residential_address.trim() === "") {
				return Swal.fire({
					text: "Please enter your residential address",
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}

			if (type_of_membership.trim() === "") {
				return Swal.fire({
					text: "Please enter your type of membership",
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

			if (type_of_membership.checked === false) {
				return Swal.fire({
					text: "Please enter your type of membership",
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

			if (faculty.trim() === "") {
				return Swal.fire({
					text: "Please enter your faculty",
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}

			if (permanent_address.trim() === "") {
				return Swal.fire({
					text: "Please enter your permanent address",
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}

			if (year_of_graduation === null) {
				return Swal.fire({
					text: "Please enter your year of graduation",
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}

			if (service_unit.trim() === "") {
				return Swal.fire({
					text: "Please select your service unit",
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}
			if (content.trim() === "") {
				return Swal.fire({
					text: "Please specify your comments",
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}

			if (file === null) {
				return Swal.fire({
					text: "Please select your photo",
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}

			const body = {
				name: `${firstName} ${lastName}`,
				sex,
				marital_status,
				no_of_children,
				date_of_birth,
				country,
				state,
				city,
				email,
				phone_no,
				contact_address,
				residential_address,
				type_of_membership,
				department,
				faculty,
				permanent_address,
				year_of_graduation,
				service_unit: "test",
				content,
				photo: file ? imgUrl : "test.jpg",
			};
			await Axios.post("/alumni-memberships", body);
			clearInput();
			Swal.fire({
				text: "Alumni Membership data sent successfully",
				icon: "success",
				animation: true,
				confirmButtonColor: "#0000FF",
			});
			window.scrollTo(0, 0);
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
		<Box sx={{ backgroundColor: "#f2f2f2" }}>
			<header className="unitHeader">
				<section className="hero-header">
					<Typography
						variant="h3"
						className="text-center mb-5 allTitles"
						style={{ marginTop: "140px", color: "white" }}
					>
						<strong>ALUMNI MEMBERSHIP</strong>
					</Typography>
				</section>
			</header>
			<Box
				component="form"
				sx={{
					padding: "15px",
					border: "1px",
					maxWidth: "800px",
					alignContent: "center",
					justifyContent: "center",
					alignItems: "center",
					margin: "auto",
					backgroundColor: "#f9f9f9",
				}}
			>
				<Grid
					container
					spacing={2}
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
							className=""
							margin="normal"
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
							onChange={(e) => setLastName(e.target.value)}
						/>
						<label>Sex:</label>
						<Grid container direction="row" spacing={2}>
							<Grid item>
								<Checkbox
									checked={sex === "Male"}
									onChange={() => setSex("Male")}
								/>
								<label className="form-check-label">Male</label>
							</Grid>
							<Grid item>
								<Checkbox
									checked={sex === "Female"}
									onChange={() => setSex("Female")}
								/>
								<label className="form-check-label">Female</label>
							</Grid>
						</Grid>
						<label className="mt-3">Marital Status:</label>
						<Grid container direction="row" spacing={4}>
							<Grid item>
								<Checkbox
									checked={marital_status === "Single"}
									onChange={() => setMaritalStatus("Single")}
								/>
								<label className="form-check-label">Single</label>
							</Grid>
							<Grid item>
								<Checkbox
									checked={marital_status === "Married"}
									onChange={() => setMaritalStatus("Married")}
								/>
								<label className="form-check-label" htmlFor="married">
									Married
								</label>
							</Grid>
							<Grid item>
								<Checkbox
									checked={marital_status === "Widowed"}
									onChange={() => setMaritalStatus("Widowed")}
								/>
								<label className="form-check-label">Widowed</label>
							</Grid>
							<Grid item>
								<Checkbox
									checked={marital_status === "Divorced"}
									onChange={() => setMaritalStatus("Divorced")}
								/>
								<label className="form-check-label">Divorced</label>
							</Grid>
						</Grid>
						<label className="mt-4">No. Of Children:</label>
						<Input
							type="number"
							label="No. of Children"
							id="amount"
							name="amount"
							className="bordered form-control "
							inputProps={{ maxLength: 12 }}
							placeholder="No. of Children"
							onChange={(e) => setChildrenNo(e.target.value)}
						/>
						<label className="mt-4">Date of Birth:</label>
						<DatePicker
							size="large"
							width="100%"
							className="form-control"
							onChange={handleDateOfBirthChange}
						/>

						<label className="mt-4">Nationality:</label>
						<select
							className="form-control required"
							onChange={(e) => handleCountryInput(e.target.value)}
						>
							<option value="None">Select Country</option>
							{filterCountries.map((country) => (
								<option value={country.isoCode} key={country.isoCode}>
									{country.name}
								</option>
							))}
						</select>
						<label className="mt-4">State of Origin:</label>
						<select
							className="form-control mt-3 required"
							onChange={(e) => handleStateInput(e.target.value)}
						>
							<option value="None">Select State</option>
							{states.map((s) => (
								<option value={s.isoCode} key={s.name}>
									{s.name}
								</option>
							))}
						</select>
						<label className="mt-4">LGA:</label>
						<select
							onChange={(e) => handleCityInput(e)}
							className="form-control mt-3 required"
						>
							<option value="None">Select City</option>
							{cities.map((c) => (
								<option key={c.name}>{c.name}</option>
							))}
						</select>
						<label className="mt-4">Email:</label>
						<Input
							type="email"
							label="Email"
							id="email"
							name="email"
							className="bordered form-control"
							placeholder="Email Address"
							onChange={(e) => setEmail(e.target.value)}
						/>
						<label className="mt-3">Phone Number:</label>
						<MuiTelInput
							value={phone_no}
							onChange={handlePhoneChange}
							className="form-control mt-3"
							placeholder="Phone Number (+234)"
						/>
						<label className="mt-4">Contact Address:</label>
						<Input
							type="text"
							label="Contact Address"
							id="contactAddress"
							name="contactAddress"
							className="bordered form-control"
							placeholder="Contact Address"
							style={{ height: "100px", width: "100%" }}
							onChange={(e) => setContactAddress(e.target.value)}
						/>
						<label className="mt-4">Residential Address:</label>
						<Input
							type="text"
							label="Residential Address"
							id="residentialAddress"
							name="residentialAddress"
							className="bordered form-control"
							placeholder="Residential Address"
							style={{ height: "100px", width: "100%" }}
							onChange={(e) => setResidentialAddress(e.target.value)}
						/>
						<label className="mt-4">Type of Membership:</label>
						<Grid container direction="row" spacing={3}>
							<Grid item>
								<Checkbox
									checked={type_of_membership === "Student"}
									onChange={() => setMembershipType("Student")}
								/>
								<label className="form-check-label">Student</label>
							</Grid>
							<Grid item>
								<Checkbox
									checked={type_of_membership === "Staff"}
									onChange={() => setMembershipType("Staff")}
								/>
								<label className="form-check-label">Staff</label>
							</Grid>

							<Grid item>
								<Checkbox
									checked={type_of_membership === "Other"}
									onChange={() => setMembershipType("Other")}
								/>
								<label className="form-check-label">Other</label>
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
							onChange={(e) => setDepartment(e.target.value)}
						/>
						<label className="mt-4">Faculty:</label>
						<Input
							type="text"
							label="Faculty"
							id="faculty"
							name="faculty"
							className="bordered form-control"
							placeholder="Faculty"
							onChange={(e) => setFaculty(e.target.value)}
						/>

						<label className="mt-4">Permanent Address:</label>
						<Input
							type="text"
							label="Permanent Address"
							id="permanent_address"
							name="permanent_address"
							className="bordered form-control"
							placeholder="Permanent Address"
							onChange={(e) => setPermanentAddress(e.target.value)}
						/>
						<label className="mt-4">Year of Graduation:</label>
						<DatePicker
							size="large"
							width="100%"
							className="form-control"
							onChange={handleYearOfGraduationDateChange}
						/>
						<label className="mt-4">Service Unit Served In:</label>
						<select
							className="form-control required"
							onChange={(e) => setServiceUnit(e.target.value)}
						>
							<option>Service Unit </option>
							<option value={"Bible Study"}>Bible Study </option>
						</select>
						<label className="mt-4">Comment/Prayer Request:</label>
						<Input
							type="text"
							label="Comment/Prayer Request"
							id="commentPrayerRequest"
							name="commentPrayerRequest"
							className="bordered form-control mb-3"
							placeholder="Comment/Prayer Request"
							style={{ height: "100px", width: "100%" }}
							onChange={(e) => setContent(e.target.value)}
						/>

						<FileUploader
							multiple={false}
							handleChange={handleUploadFileChange}
							name="file"
							className="form-control"
							types={fileTypes}
						/>
						<Button
							variant="contained"
							size="small"
							color="warning"
							className="mt-4 mb-4"
							onClick={handleSubmit}
						>
							Submit
						</Button>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
}

export default AlumniMembership;
