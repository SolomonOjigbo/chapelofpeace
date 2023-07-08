import React from "react";
import Sidebar from "../components/Sidebar";
import Title from "../components/Title";
import {
	Avatar,
	Box,
	Button,
	Container,
	FormControl,
	Grid,
	IconButton,
	Input,
	InputLabel,
	MenuItem,
	Modal,
	Paper,
	Select,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Add from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";
import { useEffect } from "react";
import { useState } from "react";
import Loader from "../components/Loader";
import Swal from "sweetalert2";
import useSWRInfinite from "swr/infinite";
import Axios from "../../config";
import CreateIcon from "@mui/icons-material/Create";

import { getUsersSWRCursor } from "../../lib/users/users";
import { Link } from "react-router-dom";
import { FileUploader } from "react-drag-drop-files";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

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

const Users = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	const { user } = useSelector(selectUser);
	console.log("token: ", user.token);

	const [openEdit, setOpenEdit] = React.useState(false);
	const [emailEdit, setEmailEdit] = useState("");
	const [nameEdit, setNameEdit] = useState("");
	const [roleEdit, setRoleEdit] = useState("");
	const [photoEdit, setPhotoEdit] = useState(null);
	const [currentData, setCurrentData] = useState({});
	const fileTypes = ["JPEG", "JPG", "PNG", "GIF"];
	const handleOpenEdit = () => setOpenEdit(true);

	const handleCloseEdit = () => setOpenEdit(false);
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
		if (pageIndex === 0) return { path: "/users", cursor: 0, limit: PAGE_SIZE };

		//add the cursor to the API e
		console.log(previousPageData.nextCursor);
		return {
			path: "/users",
			cursor: previousPageData.nextCursor,
			limit: PAGE_SIZE,
		};
	};

	const { data, size, setSize, error, mutate } = useSWRInfinite(
		getKey,
		getUsersSWRCursor
	);
	const isLoading = !data && !error;
	const isLoadingMore =
		isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
	const allUsers = data
		? data.reduce((prev, curr) => [...prev, ...curr.data], [])
		: [];
	const totalUsers = allUsers.length;
	const isEmpty = !data ? true : data?.[0]?.data.length === 0;
	const isReachingEnd =
		isEmpty ||
		(data && data[size - 1]?.data.length < PAGE_SIZE) ||
		Boolean(size > 0 && data && error);

	const loadMore = (e) => {
		e.preventDefault();
		setSize((pre) => pre + 1);
	};

	if (isLoading) {
		return <Loader />;
	}

	const handleUploadFileChange = (file) => {
		setPhotoEdit(file);
	};

	// const handleEdit = async (e, row) => {
	// 	e.preventDefault();
	// 	handleOpenEdit();
	// 	setCurrentData(row);
	// };

	const editPhoto = async () => {
		try {
			const formData = new FormData();
			formData.append("photo", photoEdit);
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

	const config = {
		headers: {
			Authorization: `Bearer ${user.token}`,
		},
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
						const res = await Axios.delete(`/users/${id}`, config);
						setSize((pre) => pre + 1);
						Swal.fire({
							text: `${res.data.message}`,
							icon: "info",
						}).then(() => {
							window.location.reload();
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

	const handleRoleChange = (event) => {
		setRoleEdit(event.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const imgUrl = await editPhoto();

		try {
			console.log("edit row", currentData);
			if (
				nameEdit.trim() === "" ||
				roleEdit.trim() === "" ||
				emailEdit.trim() === ""
				// photoEdit === null
			) {
				handleCloseEdit();
				return Swal.fire({
					text: "Please User Details",
					animation: true,
					confirmButtonColor: "#0000FF",
					timer: 3000,
				});
			}
			const body = {
				name: nameEdit,
				role: roleEdit,
				email: emailEdit,
				photo: photoEdit ? imgUrl : "",
			};
			const data = await Axios.patch(`/users/${currentData.id}`, body);
			console.log("res client", data);
			handleCloseEdit();
			Swal.fire({
				text: "User Edited Successfully",
				icon: "success",
				animation: true,
				confirmButtonColor: "#0000FF",
				timer: 3000,
			}).then(() => {
				window.location.reload();
			});
		} catch (error) {
			console.log(error);
			handleCloseEdit();
			Swal.fire({
				text: "An Error Occured",
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
									<Title>All Users</Title>

									<Stack spacing={2}>
										<Item></Item>
										<Item>
											<Button variant="contained" startIcon={<Add />}>
												<Link
													to="/register"
													variant="body2"
													style={{
														backgroundColour: "transparent",
														textDecoration: "none",
														color: "white",
													}}
												>
													Add User
												</Link>
											</Button>
										</Item>
									</Stack>
									<Modal
										open={openEdit}
										onClose={handleCloseEdit}
										aria-labelledby="modal-modal-title"
										aria-describedby="modal-modal-description"
									>
										<Box sx={modalStyles}>
											<label className="mt-4">Title:</label>
											<Input
												type="text"
												label="Edit Name"
												id="name"
												name="name"
												className="bordered form-control"
												placeholder="Enter Full Name"
												value={nameEdit}
												onChange={(e) => setNameEdit(e.target.value)}
											/>
											<label className="mt-4">Email:</label>
											<Input
												type="text"
												label="Email"
												id="email"
												name="email"
												className="bordered form-control"
												placeholder="Edit User Email"
												value={emailEdit}
												onChange={(e) => setEmailEdit(e.target.value)}
											/>
											<InputLabel id="demo-simple-select-label">
												Role
											</InputLabel>
											<FormControl fullWidth>
												<Select
													labelId="demo-simple-select-label"
													id="demo-simple-select"
													value={roleEdit}
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
												Edit User
											</Button>
										</Box>
									</Modal>
									<TableContainer component={Paper}>
										<Table sx={{ minWidth: 650 }} aria-label="simple table">
											<TableHead>
												<TableRow>
													<TableCell>S/N</TableCell>
													<TableCell align="center">Name</TableCell>
													<TableCell align="center">Username</TableCell>
													<TableCell align="center">Email</TableCell>
													<TableCell align="center">Photo</TableCell>
													<TableCell align="center">Role</TableCell>
													<TableCell align="center">Action</TableCell>
												</TableRow>
											</TableHead>
											<TableBody>
												{allUsers.map((row, i) => (
													<TableRow
														key={row.id}
														sx={{
															"&:last-child td, &:last-child th": { border: 0 },
														}}
													>
														<TableCell sx={{ width: "10px" }}>
															{i + 1}
														</TableCell>
														<TableCell align="center">{row.name}</TableCell>
														<TableCell align="center">{row.username}</TableCell>
														<TableCell align="center">{row.email}</TableCell>
														<TableCell align="center">
															<Avatar align="center" src={row.photo} />
														</TableCell>
														<TableCell align="center">{row.role}</TableCell>
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
																{/* <IconButton
																	onClick={(e) => handleEdit(e, row)}
																	aria-label="create"
																	size="small"
																>
																	<CreateIcon fontSize="inherit" />
																</IconButton> */}
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

export default Users;
