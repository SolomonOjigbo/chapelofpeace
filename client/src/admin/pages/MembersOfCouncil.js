import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
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
	Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import Sidebar from "../components/Sidebar";
import Add from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";
import { useUserAuth } from "../../lib/auth";
import Loader from "../components/Loader";
import Swal from "sweetalert2";
import useSWRInfinite from "swr/infinite";
import { getBibleStorySWRCursor } from "../../lib/bibleStory";
import { useState } from "react";
import Axios from "../../config";
import { FileUploader } from "react-drag-drop-files";
import { useEffect } from "react";
import { getMembersOfCouncilSWRCursor } from "../../lib/membersOfCouncil";
import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: "center",
	color: theme.palette.text.secondary,
}));

export default function MembersOfCouncil() {
	// const { data, error, isLoading, mutate } = useUserAuth()
	// if (!data) {
	//   window.location.href = '/login'
	// }

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [title, setTitle] = useState("");
	const [name, setName] = useState("");
	const [file, setFile] = useState(null);
	const [facebook, setFacebook] = useState("");
	const [instagram, setInstagram] = useState("");
	const [linkedin, setLinkedin] = useState("");
	const [twitter, setTwitter] = useState("");
	const [openEdit, setOpenEdit] = React.useState(false);
	const handleOpenEdit = () => setOpenEdit(true);
	const handleCloseEdit = () => setOpenEdit(false);
	const [titleEdit, setTitleEdit] = useState("");
	const [nameEdit, setNameEdit] = useState("");
	const [facebookEdit, setFacebookEdit] = useState("");
	const [instagramEdit, setInstagramEdit] = useState("");
	const [linkedinEdit, setLinkedinEdit] = useState("");
	const [twitterEdit, setTwitterEdit] = useState("");
	const [currentData, setCurrentData] = useState({});
	const fileTypes = ["JPEG", "JPG", "PNG", "GIF", "WEBP"];

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
		overflowY: "scroll !important",
		height: "80vh",
		"& .MuiDialog-paper": {
			overflowY: "scroll !important",
			height: "80vh",
		},
	};

	const getKey = (pageIndex, previousPageData) => {
		//if no user or reached the end, do not fetch
		if (previousPageData && !previousPageData.data) return null;

		//first page, we do not
		if (pageIndex === 0)
			return { path: "/members-of-council", cursor: 0, limit: PAGE_SIZE };

		//add the cursor to the API e
		console.log(previousPageData.nextCursor);
		return {
			path: "/members-of-council",
			cursor: previousPageData.nextCursor,
			limit: PAGE_SIZE,
		};
	};

	const { data, size, setSize, error, mutate } = useSWRInfinite(
		getKey,
		getMembersOfCouncilSWRCursor
	);
	const isLoading = !data && !error;
	const isLoadingMore =
		isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
	const allMembersOfCouncil = data
		? data.reduce((prev, curr) => [...prev, ...curr.data], [])
		: [];
	const totalMembersOfCouncil = allMembersOfCouncil.length;
	const isEmpty = !data ? true : data?.[0]?.data.length === 0;
	const isReachingEnd =
		isEmpty ||
		(data && data[size - 1]?.data.length < PAGE_SIZE) ||
		Boolean(size > 0 && data && error);
	console.log("allMembersOfCouncil>>>>>>", allMembersOfCouncil);
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
		setTitle("");
		setName("");
		setFacebook("");
		setInstagram("");
		setLinkedin("");
		setTwitter("");
		setFile(null);
		setTitleEdit("");
		setNameEdit("");
		setFacebookEdit("");
		setInstagramEdit("");
		setLinkedinEdit("");
		setTwitterEdit("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const imgUrl = await uploadFile();
		try {
			if (
				title.trim() === "" ||
				name.trim() === "" ||
				facebook.trim() === "" ||
				instagram.trim() === "" ||
				linkedin.trim() === "" ||
				twitter.trim() === "" ||
				file === null
			) {
				handleClose();
				return Swal.fire({
					text: "Please enter all Members of Council Details",
					animation: true,
					confirmButtonColor: "#0000FF",
					timer: 3000,
				});
			}
			const body = {
				title,
				name,
				facebook,
				instagram,
				linkedin,
				twitter,
				photo: file ? imgUrl : "Test.jpg",
			};
			await Axios.post("/members-of-council", body);
			clearInput();
			handleClose();
			Swal.fire({
				text: "Members of Council data sent successfully",
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
						const res = await Axios.delete(`/members-of-council/${id}`);
						setSize((pre) => pre + 1);
						Swal.fire({
							text: `${res.data.message}`,
							icon: "info",
						}).then(() => {
							setSize((pre) => pre + 1);
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

	const handleEdit = async (e, row) => {
		e.preventDefault();
		handleOpenEdit();
		setCurrentData(row);
	};

	const handleEditSubmit = async (e, currentData) => {
		const imgUrl = await uploadFile();
		e.preventDefault();
		try {
			console.log("edit row", currentData);
			if (
				titleEdit.trim() === "" ||
				nameEdit.trim() === "" ||
				facebookEdit.trim() === "" ||
				instagramEdit.trim() === "" ||
				linkedinEdit.trim() === "" ||
				twitterEdit.trim() === "" ||
				file === null
			) {
				handleCloseEdit();
				return Swal.fire({
					text: "Please enter all Member of Council Details",
					animation: true,
					confirmButtonColor: "#0000FF",
					timer: 3000,
				});
			}
			const body = {
				title: titleEdit,
				name: nameEdit,
				facebook: facebookEdit,
				instagram: instagramEdit,
				linkedin: linkedinEdit,
				twitter: twitterEdit,
				photo: file ? imgUrl : "Test.jpg",
			};
			const res = await Axios.patch(
				`/members-of-council/${currentData.id}`,
				body
			);
			console.log("res client", res);
			clearInput();
			handleCloseEdit();
			Swal.fire({
				text: "Member of Council Edited Successfully",
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
									<Title>All Members of Council</Title>
									<Stack spacing={2}>
										<Item></Item>
										<Item>
											<Button
												onClick={handleOpen}
												variant="contained"
												startIcon={<Add />}
											>
												Add Member of Council
											</Button>
										</Item>
									</Stack>
									{/* Add Member of Council Modal */}
									<Modal
										open={open}
										onClose={handleClose}
										aria-labelledby="modal-modal-title"
										aria-describedby="modal-modal-description"
									>
										<Box sx={modalStyles}>
											<label className="mt-4">Title:</label>
											<Input
												type="text"
												label="Title"
												id="title"
												name="title"
												className="bordered form-control"
												placeholder="Enter Member of Council Title"
												value={title}
												onChange={(e) => setTitle(e.target.value)}
											/>
											<label className="mt-4">Name:</label>
											<Input
												type="text"
												label="Name"
												id="name"
												name="name"
												className="bordered form-control"
												placeholder="Enter Name"
												value={name}
												onChange={(e) => setName(e.target.value)}
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
											<label className="mt-4">Facebook:</label>
											<Input
												type="text"
												label="Facebook"
												id="facebook"
												name="facebook"
												className="bordered form-control"
												placeholder="Enter Facebook link"
												value={facebook}
												onChange={(e) => setFacebook(e.target.value)}
											/>
											<label className="mt-4">Instagram:</label>
											<Input
												type="text"
												label="Instagram"
												id="instagram"
												name="instagram"
												className="bordered form-control"
												placeholder="Enter Instagram link"
												value={instagram}
												onChange={(e) => setInstagram(e.target.value)}
											/>
											<label className="mt-4">LinkedIn:</label>
											<Input
												type="text"
												label="LinkedIn"
												id="linkedin"
												name="linkedin"
												className="bordered form-control"
												placeholder="Enter LinkedIn link"
												value={linkedin}
												onChange={(e) => setLinkedin(e.target.value)}
											/>
											<label className="mt-4">Twitter:</label>
											<Input
												type="text"
												label="Twitter"
												id="twitter"
												name="twitter"
												className="bordered form-control"
												placeholder="Enter Twitter link"
												value={twitter}
												onChange={(e) => setTwitter(e.target.value)}
											/>
											<Button
												variant="contained"
												startIcon={<Add />}
												sx={{ mt: 3 }}
												onClick={handleSubmit}
											>
												Add Member
											</Button>
										</Box>
									</Modal>

									{/* Edit Member Of Council Modal */}
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
												label="Title"
												id="title"
												name="title"
												className="bordered form-control"
												placeholder="Enter Member of Council Title"
												value={titleEdit}
												onChange={(e) => setTitleEdit(e.target.value)}
											/>
											<label className="mt-4">Name:</label>
											<Input
												type="text"
												label="Name"
												id="name"
												name="name"
												className="bordered form-control"
												placeholder="Enter Name"
												value={nameEdit}
												onChange={(e) => setNameEdit(e.target.value)}
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
											<label className="mt-4">Facebook:</label>
											<Input
												type="text"
												label="Facebook"
												id="facebook"
												name="facebook"
												className="bordered form-control"
												placeholder="Enter Facebook link"
												value={facebookEdit}
												onChange={(e) => setFacebookEdit(e.target.value)}
											/>
											<label className="mt-4">Instagram:</label>
											<Input
												type="text"
												label="Instagram"
												id="instagram"
												name="instagram"
												className="bordered form-control"
												placeholder="Enter Instagram link"
												value={instagramEdit}
												onChange={(e) => setInstagramEdit(e.target.value)}
											/>
											<label className="mt-4">LinkedIn:</label>
											<Input
												type="text"
												label="LinkedIn"
												id="linkedin"
												name="linkedin"
												className="bordered form-control"
												placeholder="Enter LinkedIn link"
												value={linkedinEdit}
												onChange={(e) => setLinkedinEdit(e.target.value)}
											/>
											<label className="mt-4">Twitter:</label>
											<Input
												type="text"
												label="Twitter"
												id="twitter"
												name="twitter"
												className="bordered form-control"
												placeholder="Enter Twitter link"
												value={twitterEdit}
												onChange={(e) => setTwitterEdit(e.target.value)}
											/>
											<Button
												variant="contained"
												startIcon={<Add />}
												sx={{ mt: 3 }}
												onClick={(e) => handleEditSubmit(e, currentData)}
											>
												Edit Member
											</Button>
										</Box>
									</Modal>
									<TableContainer component={Paper}>
										<Table sx={{ minWidth: 650 }} aria-label="simple table">
											<TableHead>
												<TableRow>
													<TableCell align="center">S/N</TableCell>
													<TableCell align="center">Title</TableCell>
													<TableCell align="center">Name</TableCell>
													<TableCell align="center">Photo</TableCell>
													<TableCell align="center">Facebook</TableCell>
													<TableCell align="center">Instagram</TableCell>
													<TableCell align="center">LinkedIn</TableCell>
													<TableCell align="center">Twitter</TableCell>
													<TableCell align="center">Action</TableCell>
												</TableRow>
											</TableHead>
											<TableBody>
												{allMembersOfCouncil.map((row, i) => (
													<TableRow
														key={row.id}
														sx={{
															"&:last-child td, &:last-child th": { border: 0 },
														}}
													>
														<TableCell>{i + 1}</TableCell>
														<TableCell align="center">{row.title}</TableCell>
														<TableCell align="center">{row.name}</TableCell>
														<TableCell align="center">
															<Avatar align="center" src={row.photo} />
														</TableCell>
														<TableCell align="center">{row.facebook}</TableCell>
														<TableCell align="center">
															{row.instagram}
														</TableCell>
														<TableCell align="center">{row.linkedin}</TableCell>
														<TableCell align="center">{row.twitter}</TableCell>
														<TableCell component="th" scope="row">
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
}
