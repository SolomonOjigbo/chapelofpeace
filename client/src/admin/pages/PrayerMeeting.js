import React from "react";
import Sidebar from "../components/Sidebar";
import Title from "../components/Title";
import {
	Avatar,
	Box,
	Button,
	Container,
	Grid,
	IconButton,
	Input,
	Modal,
	Paper,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import Add from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";
import { useUserAuth } from "../../lib/auth";
import Loader from "../components/Loader";
import Swal from "sweetalert2";
import useSWRInfinite from "swr/infinite";
import { FileUploader } from "react-drag-drop-files";
import { DatePicker, TimePicker } from "antd";
import moment from "moment";
import Axios from "../../config";
import { useEffect } from "react";
import { useState } from "react";
import { getPrayerMeetingBulletinSWRCursor } from "../../lib/prayerMeeting";
import axios from "axios";

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
	zIndex: 1,
};

const PrayerMeeting = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [date, setDate] = useState(moment(new Date()).format("DD-MM-YYYY"));
	const [time, setTime] = useState("");
	const [venue, setVenue] = useState("");
	const [file, setFile] = useState(null);
	const [zoom_link, setZoomLink] = useState("");
	const [openEdit, setOpenEdit] = React.useState(false);
	const handleOpenEdit = () => setOpenEdit(true);
	const handleCloseEdit = () => setOpenEdit(false);
	const [dateEdit, setDateEdit] = useState("");
	const [timeEdit, setTimeEdit] = useState("");
	const [venueEdit, setVenueEdit] = useState("");
	const [photoEdit, setPhotoEdit] = useState(null);
	const [currentData, setCurrentData] = useState({});
	const fileTypes = ["JPEG", "JPG", "WEBP", "PNG", "GIF"];

	const Item = styled(Paper)(({ theme }) => ({
		backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
		...theme.typography.body2,
		padding: theme.spacing(1),
		textAlign: "center",
		color: theme.palette.text.secondary,
	}));

	const getKey = (pageIndex, previousPageData) => {
		//if no user or reached the end, do not fetch
		if (previousPageData && !previousPageData.data) return null;

		//first page, we do not
		if (pageIndex === 0)
			return { path: "/prayer-meeting-bulletin", cursor: 0, limit: PAGE_SIZE };

		//add the cursor to the API e
		console.log(previousPageData.nextCursor);
		return {
			path: "/prayer-meeting-bulletin",
			cursor: previousPageData.nextCursor,
			limit: PAGE_SIZE,
		};
	};

	const { data, size, setSize, error, mutate } = useSWRInfinite(
		getKey,
		getPrayerMeetingBulletinSWRCursor
	);
	const isLoading = !data && !error;
	const isLoadingMore =
		isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
	const allPrayerMeetingBulletin = data
		? data.reduce((prev, curr) => [...prev, ...curr.data], [])
		: [];
	const totalPrayerMeetingBulletin = allPrayerMeetingBulletin.length;
	const isEmpty = !data ? true : data?.[0]?.data.length === 0;
	const isReachingEnd =
		isEmpty ||
		(data && data[size - 1]?.data.length < PAGE_SIZE) ||
		Boolean(size > 0 && data && error);
	console.log("allPrayerMeetingBulletin>>>>>>", allPrayerMeetingBulletin);
	console.log("data and size>>>>>>", data, size);

	const loadMore = (e) => {
		e.preventDefault();
		setSize((pre) => pre + 1);
	};

	if (isLoading) {
		return <Loader />;
	}

	const handleUploadFileChange = (file) => {
		setFile(file);
	};

	// const handleEditUploadFileChange = file => {
	//   setPhotoEdit(file)
	// }

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

	const clearInput = () => {
		setDate("");
		setTime("");
		setVenue("");
		setFile(null);
		setZoomLink("");
		setDateEdit("");
		setTimeEdit("");
		setVenueEdit("");
		setPhotoEdit(null);
	};

	const handleSubmit = async (e) => {
		const imgUrl = await uploadFile();
		e.preventDefault();
		try {
			if (
				date.trim() === "" ||
				time.trim() === "" ||
				file === null ||
				venue.trim() === ""
			) {
				handleClose();
				return Swal.fire({
					text: "Please enter all Prayer Meeting Details",
					animation: true,
					confirmButtonColor: "#0000FF",
					timer: 3000,
				});
			}
			const body = {
				date,
				time,
				venue,
				zoom_link,
				photo: file ? imgUrl : "Test.jpg",
			};
			await Axios.post("/prayer-meeting-bulletin", body);
			clearInput();
			handleClose();
			Swal.fire({
				text: "Prayer Meeting data sent successfully",
				icon: "success",
				animation: true,
				confirmButtonColor: "#0000FF",
			}).then(() => {
				setSize((pre) => pre + 1);
				window.location.reload();
			});
		} catch (error) {
			console.log(error);
			handleClose();
			return Swal.fire({
				text: `${error.response.data.message}`,
				icon: "error",
				animation: true,
				confirmButtonColor: "#0000FF",
			});
		}
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
						const res = await Axios.delete(`/prayer-meeting-bulletin/${id}`);
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
		const imgUrl = await uploadFile();
		try {
			console.log("edit row", currentData);
			if (
				dateEdit.trim() === "" ||
				timeEdit.trim() === "" ||
				file === null ||
				venueEdit.trim() === "" ||
				zoom_link.trim() === ""
			) {
				handleCloseEdit();
				return Swal.fire({
					text: "Please enter all Prayer Meeting Details",
					animation: true,
					confirmButtonColor: "#0000FF",
					timer: 3000,
				});
			}
			const body = {
				date: dateEdit,
				time: timeEdit,
				venue: venueEdit,
				photo: imgUrl,
				zoom_link,
			};
			const res = await Axios.patch(
				`/prayer-meeting-bulletin/${currentData.id}`,
				body
			);
			console.log("res client", res);
			clearInput();
			handleCloseEdit();
			Swal.fire({
				text: "Prayer Meeting Successfully",
				icon: "success",
				animation: true,
				confirmButtonColor: "#0000FF",
				timer: 3000,
			}).then(() => {
				setSize((pre) => pre + 1);
				window.location.reload();
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
								<Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
									<Title>All Prayer Meeting</Title>

									<Stack spacing={2}>
										<Item></Item>
										<Item>
											<Button
												onClick={handleOpen}
												variant="contained"
												startIcon={<Add />}
											>
												Add Prayer Meeting
											</Button>
										</Item>
									</Stack>
									{/* Add Prayer Meeting Modal */}
									<Modal
										open={open}
										onClose={handleClose}
										aria-labelledby="modal-modal-title"
										aria-describedby="modal-modal-description"
									>
										<Box sx={modalStyles}>
											<label className="mt-4">Date:</label>
											<DatePicker
												onChange={(date, dateString) => setDate(dateString)}
												size="large"
												width="100%"
												className="form-control datepicker"
											/>
											<label className="mt-4">Time:</label>
											<TimePicker
												onChange={(time, timeString) => setTime(timeString)}
												size="large"
												width="100%"
												className="form-control datepicker"
											/>
											<label className="mt-4">Venue:</label>
											<Input
												type="text"
												label="Venue"
												id="venue"
												name="venue"
												className="bordered form-control"
												placeholder="Enter Prayer Meeting Venue"
												value={venue}
												onChange={(e) => setVenue(e.target.value)}
											/>
											<label className="mt-4">Zoom Link:</label>
											<Input
												type="text"
												label="Zoom Link"
												id="zoom_link"
												name="zoom_link"
												className="bordered form-control"
												placeholder="Enter Bible Study Schedule Zoom Link"
												value={zoom_link}
												onChange={(e) => setZoomLink(e.target.value)}
											/>
											<label className="mt-4">Photo:</label>
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
												startIcon={<Add />}
												sx={{ mt: 3 }}
												onClick={handleSubmit}
											>
												Add Prayer Meeting
											</Button>
										</Box>
									</Modal>

									{/* Edit Prayer Meeting Modal */}
									<Modal
										open={openEdit}
										onClose={handleCloseEdit}
										aria-labelledby="modal-modal-title"
										aria-describedby="modal-modal-description"
									>
										<Box sx={modalStyles}>
											<label className="mt-4">Date:</label>
											<DatePicker
												onChange={(date, dateString) => setDateEdit(dateString)}
												size="large"
												width="100%"
												className="form-control datepicker"
											/>
											<label className="mt-4">Time:</label>
											<TimePicker
												onChange={(time, timeString) => setTimeEdit(timeString)}
												size="large"
												width="100%"
												className="form-control datepicker"
											/>
											<label className="mt-4">Venue:</label>
											<Input
												type="text"
												label="Venue"
												id="venue"
												name="venue"
												className="bordered form-control"
												placeholder="Enter Prayer Meeting Schedule Venue"
												value={venueEdit}
												onChange={(e) => setVenueEdit(e.target.value)}
											/>
											<label className="mt-4">Zoom Link:</label>
											<Input
												type="text"
												label="Zoom Link"
												id="zoom_link"
												name="zoom_link"
												className="bordered form-control"
												placeholder="Enter Bible Study Schedule Zoom Link"
												value={zoom_link}
												onChange={(e) => setZoomLink(e.target.value)}
											/>
											<label className="mt-4">Photo:</label>
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
												startIcon={<Add />}
												sx={{ mt: 3 }}
												onClick={(e) => handleEditSubmit(e, currentData)}
											>
												Edit Prayer Meeting
											</Button>
										</Box>
									</Modal>
									<TableContainer component={Paper}>
										<Table sx={{ minWidth: 650 }} aria-label="simple table">
											<TableHead>
												<TableRow>
													<TableCell>S/N</TableCell>
													<TableCell align="center">Date</TableCell>
													<TableCell align="center">Time</TableCell>
													<TableCell align="center">Venue</TableCell>
													<TableCell align="center">Photo</TableCell>
													<TableCell align="center">Zoom Link</TableCell>
													<TableCell align="center">Action</TableCell>
												</TableRow>
											</TableHead>
											<TableBody>
												{allPrayerMeetingBulletin.map((row, i) => (
													<TableRow
														key={row.id}
														sx={{
															"&:last-child td, &:last-child th": { border: 0 },
														}}
													>
														<TableCell sx={{ width: "10px" }}>
															{i + 1}
														</TableCell>
														<TableCell align="center">{row.date}</TableCell>
														<TableCell align="center">{row.time}</TableCell>
														<TableCell align="center">{row.venue}</TableCell>
														<TableCell align="center">
															<Avatar align="center" src={row.photo} />
														</TableCell>
														<TableCell align="center">
															{row.zoom_link}
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

export default PrayerMeeting;
