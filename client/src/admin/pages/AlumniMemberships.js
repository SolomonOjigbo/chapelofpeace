import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Title from "../components/Title";
import {
	Box,
	Button,
	Container,
	Grid,
	IconButton,
	Paper,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Modal,
	Input,
	Checkbox,
	InputAdornment,
	TextField,
	Avatar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";

import useSWRInfinite from "swr/infinite";
import { getAlumniMembershipsSWRCursor } from "../../lib/alumni";
import Swal from "sweetalert2";
import Loader from "../components/Loader";
import { Country, State, City } from "country-state-city";
import { MuiTelInput } from "mui-tel-input";
import moment from "moment";
import { DatePicker } from "antd";
import Axios from "../../config";
import { validateEmail } from "../../utils";
import { FileUploader } from "react-drag-drop-files";
import Add from "@mui/icons-material/Add";
import Groups3Icon from "@mui/icons-material/Groups3";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import ElevatorIcon from "@mui/icons-material/Elevator";

import HomeIcon from "@mui/icons-material/Home";

const PAGE_SIZE = 5;

const modalStyles = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
	overflowY: "scroll !important",
	height: "80vh",
	"& .MuiDialog-paper": {
		overflowY: "scroll !important",
		height: "80vh",
	},
};

const AlumniMemberships = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [openEdit, setOpenEdit] = React.useState(false);
	const handleOpenEdit = () => setOpenEdit(true);
	const handleCloseEdit = () => setOpenEdit(false);
	const [date_of_birth, setDate] = useState(null);
	const [year_of_graduation, setYearOfGraduation] = useState(null);
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
	const [photo, setPhoto] = useState("");
	const fileTypes = ["JPEG", "PNG", "GIF"];
	const [currentData, setCurrentData] = useState({});

	const getKey = (pageIndex, previousPageData) => {
		//if no user or reached the end, do not fetch
		if (previousPageData && !previousPageData.data) return null;

		//first page, we do not
		if (pageIndex === 0)
			return { path: "/alumni-memberships", cursor: 0, limit: PAGE_SIZE };

		//add the cursor to the API e
		console.log(previousPageData.nextCursor);
		return {
			path: "/alumni-memberships",
			cursor: previousPageData.nextCursor,
			limit: PAGE_SIZE,
		};
	};

	const { data, size, setSize, error, mutate } = useSWRInfinite(
		getKey,
		getAlumniMembershipsSWRCursor
	);
	const isLoading = !data && !error;
	const isLoadingMore =
		isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
	const allAlumniMemberships = data
		? data.reduce((prev, curr) => [...prev, ...curr.data], [])
		: [];
	const totalAlumniMembership = allAlumniMemberships.length;
	const isEmpty = !data ? true : data?.[0]?.data.length === 0;
	const isReachingEnd =
		isEmpty ||
		(data && data[size - 1]?.data.length < PAGE_SIZE) ||
		Boolean(size > 0 && data && error);
	console.log("allAlumniMemberships>>>>>>", allAlumniMemberships);
	console.log("data and size>>>>>>", data, size);

	const loadMore = (e) => {
		e.preventDefault();
		setSize((pre) => pre + 1);
	};

	if (isLoading) {
		return <Loader />;
	}

	const handleUploadFileChange = (file) => {
		setPhoto(file);
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

	const handleDelete = async (e, id) => {
		e.preventDefault();
		try {
			console.log("delete id", id);
			Swal.fire({
				text: "Are you sure you want to delete this?",
				icon: "error",
				showCancelButton: true,
				confirmButtonColor: "#ff0000",
			}).then(async (result) => {
				if (result.value) {
					try {
						const res = await Axios.delete(`/alumni-memberships/${id}`);
						setSize((pre) => pre + 1);
						Swal.fire({
							text: `${res.data.message}`,
							icon: "info",
						});
					} catch (error) {
						Swal.fire({
							text: `${error.response.data.message}`,
							icon: "error",
							confirmButtonColor: "#0000FF",
						});
					}
				}
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handleEdit = async (e, row) => {
		e.preventDefault();
		handleOpenEdit();
		setCurrentData(row);
	};

	const handleEditSubmit = async (e, currentData) => {
		e.preventDefault();
		try {
			console.log("edit row", currentData);
			if (firstName.trim() === "" || lastName.trim() === "") {
				handleCloseEdit();
				return Swal.fire({
					text: "Please enter your full name",
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}

			if (sex.checked === false) {
				handleCloseEdit();
				return Swal.fire({
					text: "Please select your Gender",
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}

			if (marital_status.checked === false) {
				handleCloseEdit();
				return Swal.fire({
					text: "Please select your Marital Status",
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}

			if (no_of_children.trim() === "") {
				handleCloseEdit();
				return Swal.fire({
					text: "Please enter your level",
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}

			if (date_of_birth === null) {
				handleCloseEdit();
				return Swal.fire({
					text: "Please enter your date of birth",
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}

			if (!validateEmail(email)) {
				handleCloseEdit();
				return Swal.fire({
					text: "Please enter a valid email address",
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}

			if (phone_no.trim() === "") {
				handleCloseEdit();
				return Swal.fire({
					text: "Please enter your phone number",
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}

			if (type_of_membership.checked === false) {
				handleCloseEdit();
				return Swal.fire({
					text: "Please enter your prayer point",
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}

			if (department.trim() === "") {
				handleCloseEdit();
				return Swal.fire({
					text: "Please enter your department",
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}

			if (level.trim() === "") {
				handleCloseEdit();
				return Swal.fire({
					text: "Please enter your level",
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}

			if (permanent_address.trim() === "") {
				handleCloseEdit();
				return Swal.fire({
					text: "Please enter your prayer point",
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}

			if (contact_address.trim() === "") {
				handleCloseEdit();
				return Swal.fire({
					text: "Please enter your prayer point",
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}

			if (residential_address.trim() === "") {
				handleCloseEdit();
				return Swal.fire({
					text: "Please enter your prayer point",
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}

			if (next_of_kin_name.trim() === "") {
				handleCloseEdit();
				return Swal.fire({
					text: "Please enter your next of kin name",
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}

			if (next_of_kin_phone_no.trim() === "") {
				handleCloseEdit();
				return Swal.fire({
					text: "Please enter your next of kin phone number",
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}

			if (next_of_kin_address.trim() === "") {
				handleCloseEdit();
				return Swal.fire({
					text: "Please enter your next of kin address",
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}

			if (born_again.trim() === "") {
				handleCloseEdit();
				return Swal.fire({
					text: "Please select your baptism status",
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}

			if (baptized.trim() === "") {
				handleCloseEdit();
				return Swal.fire({
					text: "Please select an option if you were baptized by water",
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}

			if (baptism_method.trim() === "") {
				handleCloseEdit();
				return Swal.fire({
					text: "Please select your baptism method",
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}

			if (holy_ghost_baptism.trim() === "") {
				handleCloseEdit();
				return Swal.fire({
					text: `Please select if you've been Baptized`,
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}

			if (speaking_in_tongues.trim() === "") {
				handleCloseEdit();
				return Swal.fire({
					text: "Please select if you believe in speaking in tongues",
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}

			if (content.trim() === "") {
				handleCloseEdit();
				return Swal.fire({
					text: "Please specify your comments",
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}
			const fullName = `${firstName} ` + `${lastName}`;
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
				year_of_graduation,
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
				service_unit: "update",
				content,
				photo: "update.jpg",
			};
			const res = await Axios.patch(
				`/alumni-memberships/${currentData.id}`,
				body
			);
			console.log("res client", res);
			clearInput();
			handleCloseEdit();
			Swal.fire({
				text: "Alumni Membership Edited successfully",
				icon: "success",
				animation: true,
				confirmButtonColor: "#0000FF",
				timer: 3000,
			}).then(() => {
				setSize((pre) => pre + 1);
				// window.location.reload()
			});
		} catch (error) {
			console.log(error);
			handleCloseEdit();
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
			<Box sx={{ display: "flex" }}>
				<Sidebar />
				<Box
					component="main"
					sx={{
						backgroundColor: (theme) =>
							theme.palette.mode === "light"
								? theme.palette.grey[100]
								: theme.palette.grey[900],
						flexGrow: 1,
						height: "100vh",
						overflow: "auto",
					}}
				>
					<Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
						<Grid container spacing={3}>
							<Grid item xs={12}>
								{/* Edit Alumni Memberships Modal */}
								<Modal
									open={openEdit}
									onClose={handleCloseEdit}
									aria-labelledby="modal-modal-title"
									aria-describedby="modal-modal-description"
								>
									<Box sx={modalStyles}>
										<label>Full Name:</label>
										<Grid container direction="row" spacing={2}>
											<TextField
												fullWidth
												required
												id="firstName"
												label="First Name"
												name="firstName"
												className=""
												margin="normal"
												width="100%"
												value={firstName}
												onChange={(e) => setFirstName(e.target.value)}
											/>
										</Grid>
										<Grid container direction="row" spacing={2}>
											<TextField
												fullWidth
												required
												id="surname"
												label="Surname"
												name="surname"
												className="mt-5 mb-3"
												margin="normal"
												value={lastName}
												onChange={(e) => setLastName(e.target.value)}
											/>
										</Grid>

										<label>Sex:</label>
										<Grid container direction="row" spacing={2}>
											<Grid item>
												<Checkbox
													checked={sex === "male"}
													onChange={() => setSex("male")}
												/>
												<label className="form-check-label" htmlFor="male">
													Male
												</label>
											</Grid>
											<Grid item>
												<Checkbox
													checked={sex === "female"}
													onChange={() => setSex("female")}
												/>
												<label className="form-check-label" htmlFor="female">
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
												<label className="form-check-label" htmlFor="single">
													Single
												</label>
											</Grid>
											<Grid item>
												<Checkbox
													checked={marital_status === "married"}
													onChange={() => setMaritalStatus("married")}
												/>
												<label className="form-check-label" htmlFor="married">
													Married
												</label>
											</Grid>
											<Grid item>
												<Checkbox
													checked={marital_status === "widowed"}
													onChange={() => setMaritalStatus("widowed")}
												/>
												<label className="form-check-label" htmlFor="widowed">
													Widowed
												</label>
											</Grid>
											<Grid item>
												<Checkbox
													checked={marital_status === "divorced"}
													onChange={() => setMaritalStatus("divorced")}
												/>
												<label className="form-check-label" htmlFor="divorced">
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
											onChange={(e) => setDate(moment(e).format("DD-MM-YYYY"))}
											size="large"
											width="100%"
											className="form-control datepicker"
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
												<label className="form-check-label" htmlFor="student">
													Student
												</label>
											</Grid>
											<Grid item>
												<Checkbox
													checked={type_of_membership === "graduate"}
													onChange={() => setMembershipType("graduate")}
												/>
												<label className="form-check-label" htmlFor="staff">
													Staff
												</label>
											</Grid>

											<Grid item>
												<Checkbox
													checked={type_of_membership === "parent"}
													onChange={() => setMembershipType("parent")}
												/>
												<label className="form-check-label" htmlFor="other">
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
										<label className="mt-4">Year of Graduation:</label>
										<DatePicker
											onChange={(e) =>
												setYearOfGraduation(moment(e).format("DD-MM-YYYY"))
											}
											size="large"
											width="100%"
											className="form-control datepicker"
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
												<label
													className="form-check-label"
													htmlFor="yesBornAgain"
												>
													Yes
												</label>
											</Grid>
											<Grid item>
												<Checkbox
													checked={born_again === "no"}
													onChange={() => setBornAgain("no")}
												/>
												<label
													className="form-check-label"
													htmlFor="noBornAgain"
												>
													No
												</label>
											</Grid>
										</Grid>

										<label className="mt-4">
											Have you been Baptized by water?:
										</label>
										<Grid container direction="row" spacing={2}>
											<Grid item>
												<Checkbox
													checked={baptized === "yes"}
													onChange={() => setBaptized("yes")}
												/>
												<label
													className="form-check-label"
													htmlFor="yesBaptized"
												>
													Yes
												</label>
											</Grid>
											<Grid item>
												<Checkbox
													checked={baptized === "no"}
													onChange={() => setBaptized("no")}
												/>
												<label
													className="form-check-label"
													htmlFor="noBaptized"
												>
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
												<label
													className="form-check-label"
													htmlFor="yesWaterBaptism"
												>
													Immersion
												</label>
											</Grid>
											<Grid item>
												<Checkbox
													checked={baptism_method === "sprinkling"}
													onChange={() => setBaptismMethod("sprinkling")}
												/>
												<label
													className="form-check-label"
													htmlFor="noWaterBaptism"
												>
													Sprinkling
												</label>
											</Grid>
										</Grid>

										<label className="mt-4">
											Have you had Holy Ghost Baptism?:
										</label>
										<Grid container direction="row" spacing={2}>
											<Grid item>
												<Checkbox
													checked={holy_ghost_baptism === "yes"}
													onChange={() => setHolyGhostBaptism("yes")}
												/>
												<label
													className="form-check-label"
													htmlFor="yesHolyGhostBaptism"
												>
													Yes
												</label>
											</Grid>
											<Grid item>
												<Checkbox
													checked={holy_ghost_baptism === "no"}
													onChange={() => setHolyGhostBaptism("no")}
												/>
												<label
													className="form-check-label"
													htmlFor="noHolyGhostBaptism"
												>
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
												<label
													className="form-check-label"
													htmlFor="yesSpeakinInTongues"
												>
													Yes
												</label>
											</Grid>
											<Grid item>
												<Checkbox
													checked={speaking_in_tongues === "no"}
													onChange={() => setSpeakingInTongues("no")}
												/>
												<label
													className="form-check-label"
													htmlFor="noSpeakinInTongues"
												>
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
											style={{
												height: "100px",
												width: "100%",
												marginBottom: "20px",
											}}
											value={content}
											onChange={(e) => setContent(e.target.value)}
										/>

										<FileUploader
											multiple={true}
											handleChange={handleUploadFileChange}
											name="file"
											className="form-control"
											style={{ height: "300px", marginTop: "20px" }}
											types={fileTypes}
										/>
										<Button
											variant="contained"
											startIcon={<Add />}
											sx={{ mt: 3 }}
											onClick={(e) => handleEditSubmit(e, currentData)}
										>
											Update Alumni Membership
										</Button>
									</Box>
								</Modal>
								<Paper
									sx={{
										p: 2,
										display: "flex",
										flexDirection: "column",
										minWidth: "1200px",
									}}
								>
									<Title>
										Alumni Membership:(<b>{totalAlumniMembership}</b>)
									</Title>
									<TableContainer sx={{ minWidth: "1100px" }} component={Paper}>
										<Table sx={{ minWidth: "800px" }} aria-label="simple table">
											<TableHead>
												<TableRow>
													<TableCell align="center">S/N</TableCell>
													<TableCell align="center">Full Name</TableCell>
													<TableCell align="center">Sex</TableCell>
													<TableCell align="center">Marital Status</TableCell>
													<TableCell align="center">No. of Children</TableCell>
													<TableCell align="center">Date of Birth</TableCell>
													<TableCell align="center">Country</TableCell>
													<TableCell align="center">State</TableCell>
													<TableCell align="center">City</TableCell>
													<TableCell align="center">Email</TableCell>
													<TableCell align="center">Phone Number</TableCell>
													<TableCell align="center">Contact Address</TableCell>
													<TableCell align="center">
														Residential Address
													</TableCell>
													<TableCell align="center">
														Type of Membership
													</TableCell>
													<TableCell align="center">Department</TableCell>
													<TableCell align="center">Faculty</TableCell>
													<TableCell align="center">
														Permanent Address
													</TableCell>
													<TableCell align="center">
														Year of Graduation
													</TableCell>
													<TableCell align="center">Service Unit</TableCell>
													<TableCell align="center">Content</TableCell>
													<TableCell align="center">Photo</TableCell>
													<TableCell align="center">Action</TableCell>
												</TableRow>
											</TableHead>
											<TableBody>
												{allAlumniMemberships.map((row, i) => (
													<TableRow
														key={row.id.toString()}
														sx={{
															"&:last-child td, &:last-child th": { border: 0 },
														}}
													>
														<TableCell>{i + 1}</TableCell>

														{/* <TableCell component='th' scope='row'>
                              {row.name}
                            </TableCell> */}
														<TableCell align="center">{row.name}</TableCell>
														<TableCell align="center">{row.sex}</TableCell>
														<TableCell align="center">
															{row.marital_status}
														</TableCell>
														<TableCell align="center">
															{row.no_of_children}
														</TableCell>
														<TableCell align="center">
															{row.date_of_birth}
														</TableCell>
														<TableCell align="center">{row.country}</TableCell>
														<TableCell align="center">{row.state}</TableCell>
														<TableCell align="center">{row.city}</TableCell>
														<TableCell align="center">{row.email}</TableCell>
														<TableCell align="center">{row.phone_no}</TableCell>
														<TableCell align="center">
															{row.contact_address}
														</TableCell>
														<TableCell align="center">
															{row.residential_address}
														</TableCell>
														<TableCell align="center">
															{row.type_of_membership}
														</TableCell>
														<TableCell align="center">
															{row.department}
														</TableCell>
														<TableCell align="center">{row.faculty}</TableCell>
														<TableCell align="center">
															{row.permanent_address}
														</TableCell>
														<TableCell align="center">
															{row.year_of_graduation}
														</TableCell>
														<TableCell align="center">
															{row.service_unit}
														</TableCell>
														<TableCell align="center">{row.content}</TableCell>
														<TableCell align="center">
															<Avatar align="center" src={row.photo} />
														</TableCell>
														<TableCell align="center">
															<Stack align="center">
																<IconButton
																	onClick={(e) => handleDelete(e, row.id)}
																	aria-label="delete"
																	size="small"
																>
																	<DeleteIcon
																		fontSize="inherit"
																		color="error"
																	/>
																</IconButton>
																<IconButton
																	onClick={(e) => handleEdit(e, row)}
																	aria-label="create"
																	size="small"
																>
																	<CreateIcon fontSize="inherit" />
																</IconButton>
															</Stack>
														</TableCell>
													</TableRow>
												))}
											</TableBody>
										</Table>
									</TableContainer>
									{
										<Button
											disabled={isReachingEnd || isLoadingMore}
											onClick={(e) => loadMore(e)}
										>
											{isLoadingMore && !isReachingEnd ? (
												<Loader />
											) : isReachingEnd ? (
												"No more data"
											) : (
												"Load more"
											)}
										</Button>
									}
								</Paper>
							</Grid>
						</Grid>
					</Container>
				</Box>
			</Box>
		</>
	);
};

export default AlumniMemberships;
