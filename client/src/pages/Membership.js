import React, { useEffect, useState } from "react";
import Input from "@mui/material/Input";
import {
	Box,
	Button,
	Checkbox,
	Grid,
	InputAdornment,
	TextField,
	Typography,
} from "@mui/material";
import { DatePicker } from "antd";
import moment from "moment";
import { Country, State, City } from "country-state-city";
import { MuiTelInput } from "mui-tel-input";
import { FileUploader } from "react-drag-drop-files";
import Axios from "../config";
import Swal from "sweetalert2";
import { validateEmail } from "../utils";
import Groups3Icon from "@mui/icons-material/Groups3";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import ElevatorIcon from "@mui/icons-material/Elevator";
import HomeIcon from "@mui/icons-material/Home";
import axios from "axios";

function Membership() {
	const [date_of_birth, setDate] = useState(null);
	const [country, setCountry] = useState("");
	const [countryCode, setCountryCode] = useState("");
	const [city, setCity] = useState("");
	const [cities, setCities] = useState([]);
	const [state, setState] = useState("");
	const [states, setStates] = useState([]);
	const [phone_no, setPhone] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [name, setName] = useState("");
	const [sex, setSex] = useState("male");
	const [marital_status, setMaritalStatus] = useState("single");
	const [no_of_children, setChildrenNo] = useState("");
	const [email, setEmail] = useState("");
	const [type_of_membership, setMembershipType] = useState("student");
	const [department, setDepartment] = useState("");
	const [level, setLevel] = useState("");
	const [permanent_address, setPermanentAddress] = useState("");
	const [contact_address, setContactAddress] = useState("");
	const [residential_address, setResidentialAddress] = useState("");
	const [next_of_kin_name, setNextOfKinName] = useState("");
	const [next_of_kin_phone_no, setNextOfKinPhoneNo] = useState("");
	const [next_of_kin_address, setNextOfKinAddress] = useState("");
	const [born_again, setBornAgain] = useState("yes");
	const [baptized, setBaptized] = useState("yes");
	const [baptism_method, setBaptismMethod] = useState("immersion");
	const [holy_ghost_baptism, setHolyGhostBaptism] = useState("yes");
	const [speaking_in_tongues, setSpeakingInTongues] = useState("yes");
	const [service_unit, setServiceUnit] = useState("");
	const [content, setContent] = useState("");
	const [file, setFile] = useState("");
	const fileTypes = ["JPEG", "JPG", "PNG", "GIF"];

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const handleUploadFileChange = (file) => {
		setFile(file);
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

	const handlePhoneChange = (e) => {
		setPhone(e);
	};

	const handleNextOfKinPhoneChange = (e) => {
		setNextOfKinPhoneNo(e);
	};

	const clearInput = () => {
		setLastName("");
		setPhone("");
		setMaritalStatus("");
		setLevel("");
		setSex("");
		setDepartment("");
		setBaptismMethod("");
		setResidentialAddress("");
		setBaptized("");
		setHolyGhostBaptism("");
		setDepartment("");
		setFirstName("");
		setChildrenNo("");
		setContent("");
		setServiceUnit("");
		setSpeakingInTongues("");
		setBornAgain("");
		setNextOfKinAddress("");
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
					text: "Please enter your level",
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

			if (type_of_membership.checked === false) {
				return Swal.fire({
					text: "Please enter your prayer point",
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

			if (permanent_address.trim() === "") {
				return Swal.fire({
					text: "Please enter your prayer point",
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}

			if (contact_address.trim() === "") {
				return Swal.fire({
					text: "Please enter your prayer point",
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}

			if (residential_address.trim() === "") {
				return Swal.fire({
					text: "Please enter your prayer point",
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}

			if (next_of_kin_name.trim() === "") {
				return Swal.fire({
					text: "Please enter your next of kin name",
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}

			if (next_of_kin_phone_no.trim() === "") {
				return Swal.fire({
					text: "Please enter your next of kin phone number",
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}

			if (next_of_kin_address.trim() === "") {
				return Swal.fire({
					text: "Please enter your next of kin address",
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}

			if (born_again.trim() === "") {
				return Swal.fire({
					text: "Please select your baptism status",
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}

			if (baptized.trim() === "") {
				return Swal.fire({
					text: "Please select an option if you were baptized by water",
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}

			if (baptism_method.trim() === "") {
				return Swal.fire({
					text: "Please select your baptism method",
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}

			if (holy_ghost_baptism.trim() === "") {
				return Swal.fire({
					text: `Please select if you've been Baptized`,
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}

			if (speaking_in_tongues.trim() === "") {
				return Swal.fire({
					text: "Please select if you believe in speaking in tongues",
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

			const fullName = `${firstName} ${lastName}`;
			setName(fullName);
			const body = {
				name: fullName,
				sex,
				marital_status,
				no_of_children,
				date_of_birth,
				country,
				state,
				city,
				email,
				phone_no,
				type_of_membership,
				department,
				level,
				permanent_address,
				contact_address,
				residential_address,
				next_of_kin_name,
				next_of_kin_phone_no,
				next_of_kin_address,
				born_again,
				baptized,
				baptism_method,
				holy_ghost_baptism,
				speaking_in_tongues,
				service_unit: "test",
				content,
				photo: imgUrl,
			};
			await Axios.post("/memberships", body);
			clearInput();
			Swal.fire({
				text: "Membership data sent successfully",
				icon: "success",
				animation: true,
				confirmButtonColor: "#0000FF",
			});
			window.scrollTo(0, 0);
		} catch (error) {
			console.log(error);
			Swal.fire({
				text: "An error occured",
				icon: "error",
				animation: true,
				confirmButtonColor: "#0000FF",
			});
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
						<strong>MEMBERSHIP</strong>
					</Typography>
				</section>
			</header>
			<Typography
				variant="h5"
				className="text-center mb-5 allTitles"
				style={{
					marginTop: "40px",
					background: `linear-gradient(rgba(0, 72, 6, 0.8), rgb(192, 72, 72, 0.8)), url("https://ik.imagekit.io/ikmedia/blog/hero-image.jpeg")`,
					color: "white",
					height: "100%",
					paddingTop: "70px",
					paddingBottom: "70px",
				}}
			>
				<strong>
					We are pleased to have you join us and be a part of this great vision.
					God bless you!
					<br />
					Please fill the form below as accurately as possible
				</strong>
			</Typography>
			<Grid
				container
				spacing={1}
				columns={12}
				justifyContent="center"
				alignItems="center"
				sx={{
					padding: "40px",
					alignItems: "center",
					margin: "auto",
				}}
			>
				<Box sx={{ backgroundColor: "#f0f0f0", paddingX: "20%" }}>
					<Grid
						container
						columns={12}
						direction="row"
						spacing={3}
						alignItems="center"
						sx={{ paddingTop: 5, justifyContent: "center" }}
					>
						<Grid item md={6}>
							<TextField
								fullWidth
								required
								id="firstName"
								label="First Name"
								name="firstName"
								className="mt-2 mb-1"
								margin="normal"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
							/>
						</Grid>
						<Grid item md={6}>
							<TextField
								fullWidth
								required
								id="surname"
								label="Surname"
								name="surname"
								className="mt-2 mb-1"
								margin="normal"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
							/>
						</Grid>
					</Grid>
					<Grid container direction="row" alignItems="center" spacing={1}>
						<Grid item xs={3}>
							<label>Sex:</label>
						</Grid>
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

					<Grid container direction="row" alignItems="center" spacing={1}>
						<Grid item xs={3}>
							<label>Marital Status:</label>
						</Grid>
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

					<label className="mt-4">No. Of Children:</label>
					<Input
						type="number"
						label="No. of Children"
						id="amount"
						name="amount"
						inputProps={{ maxLength: 12 }}
						placeholder="No. of Children"
						value={no_of_children}
						sx={{ width: "100%" }}
						onChange={(e) => setChildrenNo(e.target.value)}
						startAdornment={
							<InputAdornment position="start">
								<Groups3Icon />
							</InputAdornment>
						}
						variant="outlined"
					/>

					<label className="mt-4">Date of Birth:</label>
					<DatePicker
						onChange={(date, dateString) => setDate(dateString)}
						size="large"
						width="100%"
						className="form-control"
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
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						startAdornment={
							<InputAdornment position="start">
								<AlternateEmailIcon />
							</InputAdornment>
						}
					/>

					<label className="mt-3">Phone Number:</label>
					<MuiTelInput
						value={phone_no}
						onChange={handlePhoneChange}
						className="form-control mt-3"
						placeholder="Phone Number (+234)"
					/>

					<label className="mt-4">Type of Membership:</label>
					<Grid container direction="row" spacing={3}>
						<Grid item>
							<Checkbox
								checked={type_of_membership === "student"}
								onChange={() => setMembershipType("student")}
							/>
							<label className="form-check-label" for="student">
								Student
							</label>
						</Grid>
						<Grid item>
							<Checkbox
								checked={type_of_membership === "graduate"}
								onChange={() => setMembershipType("graduate")}
							/>
							<label className="form-check-label" for="staff">
								Staff
							</label>
						</Grid>

						<Grid item>
							<Checkbox
								checked={type_of_membership === "parent"}
								onChange={() => setMembershipType("parent")}
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
						startAdornment={
							<InputAdornment position="start">
								<ContactMailIcon />
							</InputAdornment>
						}
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
						startAdornment={
							<InputAdornment position="start">
								<ElevatorIcon />
							</InputAdornment>
						}
					/>

					<label className="mt-4">Permanent Address:</label>
					<Input
						type="text"
						label="Permanent Address"
						id="permAddress"
						name="permAddress"
						className="bordered form-control"
						placeholder="Permanent Address"
						style={{ height: "100px", width: "100%" }}
						value={permanent_address}
						onChange={(e) => setPermanentAddress(e.target.value)}
						startAdornment={
							<InputAdornment position="start">
								<HomeIcon />
							</InputAdornment>
						}
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
						value={contact_address}
						onChange={(e) => setContactAddress(e.target.value)}
						startAdornment={
							<InputAdornment position="start">
								<HomeIcon />
							</InputAdornment>
						}
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
						value={residential_address}
						onChange={(e) => setResidentialAddress(e.target.value)}
						startAdornment={
							<InputAdornment position="start">
								<HomeIcon />
							</InputAdornment>
						}
					/>

					<label className="mt-4">Next of Kin Name:</label>
					<Input
						type="text"
						label="Next of Kin"
						id="nextOfKin"
						name="nextOfKin"
						className="bordered form-control"
						placeholder="Next of Kin"
						value={next_of_kin_name}
						onChange={(e) => setNextOfKinName(e.target.value)}
					/>

					<label className="mt-4">Next of Kin Phone No.:</label>
					<MuiTelInput
						className="form-control mt-3"
						placeholder="Phone Number (+234)"
						value={next_of_kin_phone_no}
						onChange={handleNextOfKinPhoneChange}
					/>

					<label className="mt-4">Next of Kin Address:</label>
					<Input
						type="text"
						label="Next of Kin Address"
						id="nextOfKinAddress"
						name="nextOfKinAddress"
						className="bordered form-control"
						placeholder="Next of Kin Address"
						style={{ height: "100px", width: "100%" }}
						value={next_of_kin_address}
						onChange={(e) => setNextOfKinAddress(e.target.value)}
					/>

					<label className="mt-4">Are you Born Again:</label>
					<Grid container direction="row" spacing={2}>
						<Grid item>
							<Checkbox
								checked={born_again === "yes"}
								onChange={() => setBornAgain("yes")}
							/>
							<label className="form-check-label" for="yesBornAgain">
								Yes
							</label>
						</Grid>
						<Grid item>
							<Checkbox
								checked={born_again === "no"}
								onChange={() => setBornAgain("no")}
							/>
							<label className="form-check-label" for="noBornAgain">
								No
							</label>
						</Grid>
					</Grid>

					<label className="mt-4">Have you been Baptized by water?:</label>
					<Grid container direction="row" spacing={2}>
						<Grid item>
							<Checkbox
								checked={baptized === "yes"}
								onChange={() => setBaptized("yes")}
							/>
							<label className="form-check-label" for="yesBaptized">
								Yes
							</label>
						</Grid>
						<Grid item>
							<Checkbox
								checked={baptized === "no"}
								onChange={() => setBaptized("no")}
							/>
							<label className="form-check-label" for="noBaptized">
								No
							</label>
						</Grid>
					</Grid>

					<label className="mt-4">Method of Water Baptism?:</label>
					<Grid container direction="row" spacing={2}>
						<Grid item>
							<Checkbox
								checked={baptism_method === "immersion"}
								onChange={() => setBaptismMethod("immersion")}
							/>
							<label className="form-check-label" for="yesWaterBaptism">
								Immersion
							</label>
						</Grid>
						<Grid item>
							<Checkbox
								checked={baptism_method === "sprinkling"}
								onChange={() => setBaptismMethod("sprinkling")}
							/>
							<label className="form-check-label" for="noWaterBaptism">
								Sprinkling
							</label>
						</Grid>
					</Grid>

					<label className="mt-4">Have you had Holy Ghost Baptism?:</label>
					<Grid container direction="row" spacing={2}>
						<Grid item>
							<Checkbox
								checked={holy_ghost_baptism === "yes"}
								onChange={() => setHolyGhostBaptism("yes")}
							/>
							<label className="form-check-label" for="yesHolyGhostBaptism">
								Yes
							</label>
						</Grid>
						<Grid item>
							<Checkbox
								checked={holy_ghost_baptism === "no"}
								onChange={() => setHolyGhostBaptism("no")}
							/>
							<label className="form-check-label" for="noHolyGhostBaptism">
								No
							</label>
						</Grid>
					</Grid>

					<label className="mt-4">
						Do you Believe in Speaking in Tongues?:
					</label>
					<Grid container direction="row" spacing={2}>
						<Grid item>
							<Checkbox
								checked={speaking_in_tongues === "yes"}
								onChange={() => setSpeakingInTongues("yes")}
							/>
							<label className="form-check-label" for="yesSpeakinInTongues">
								Yes
							</label>
						</Grid>
						<Grid item>
							<Checkbox
								checked={speaking_in_tongues === "no"}
								onChange={() => setSpeakingInTongues("no")}
							/>
							<label className="form-check-label" for="noSpeakinInTongues">
								No
							</label>
						</Grid>
					</Grid>

					<label className="mt-4">
						Chapel Service Unit (or intended unit):
					</label>
					<select className="form-control required">
						<option value="">Service Unit</option>
					</select>

					<label className="mt-4">Comments:</label>
					<Input
						type="text"
						label="Comments"
						id="comments"
						name="comments"
						className="bordered form-control"
						placeholder="Comments"
						style={{ height: "100px", width: "100%", marginBottom: "20px" }}
						value={content}
						onChange={(e) => setContent(e.target.value)}
					/>

					<FileUploader
						multiple={false}
						handleChange={handleUploadFileChange}
						name="file"
						className="form-control"
						style={{ height: "300px", marginTop: "20px" }}
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
				</Box>
				<Grid sx={{ mb: 3 }} align="center" className="text-center">
					Thank you for the time you took to fill the form. We will communicate
					with you shortly
				</Grid>
			</Grid>
		</>
	);
}

export default Membership;
