import React from "react";
import Sidebar from "../components/Sidebar";
import Title from "../components/Title";
import Truncate from "react-truncate-html";
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
// import { checkAuthUser, useUserAuth } from "../../lib/auth";
import { useEffect } from "react";
import { useState } from "react";
import { getPostsSWRCursor } from "../../lib/post";
import Loader from "../components/Loader";
import Swal from "sweetalert2";
import useSWRInfinite from "swr/infinite";
import Axios from "../../config";
import { FileUploader } from "react-drag-drop-files";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { EditorState, convertToRaw } from "draft-js";
import { Link } from "react-router-dom";
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
	overflowY: "scroll !important",
	height: "80vh",
	"& .MuiDialog-paper": {
		overflowY: "scroll !important",
		height: "80vh",
	},
};

const Posts = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	let editorState = EditorState.createEmpty();
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [photo, setPhoto] = useState(null);
	const [openEdit, setOpenEdit] = React.useState(false);
	const handleOpenEdit = () => setOpenEdit(true);
	const handleCloseEdit = () => setOpenEdit(false);
	const [titleEdit, setTitleEdit] = useState("");
	const [nameEdit, setNameEdit] = useState("");
	const [descriptionEdit, setDescriptionEdit] = useState("");
	const [contentEdit, setContentEdit] = useState(editorState);
	const [photoEdit, setPhotoEdit] = useState(null);
	const [currentData, setCurrentData] = useState({});

	const fileTypes = ["JPEG", "JPG", "PNG", "GIF", "WEBP"];

	const onEditorStateChange = (editorState) => {
		setContentEdit(editorState);
	};

	const user = localStorage.getItem("_c_user");
	if (!user) {
		window.location.href = "/login";
	}

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
		if (pageIndex === 0) return { path: "/post", cursor: 0, limit: PAGE_SIZE };

		//add the cursor to the API e
		console.log(previousPageData.nextCursor);
		return {
			path: "/post",
			cursor: previousPageData.nextCursor,
			limit: PAGE_SIZE,
		};
	};

	const { data, size, setSize, error, mutate } = useSWRInfinite(
		getKey,
		getPostsSWRCursor
	);
	const isLoading = !data && !error;
	const isLoadingMore =
		isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
	const allPosts = data
		? data.reduce((prev, curr) => [...prev, ...curr.data], [])
		: [];
	const totalPosts = allPosts.length;
	const isEmpty = !data ? true : data?.[0]?.data.length === 0;
	const isReachingEnd =
		isEmpty ||
		(data && data[size - 1]?.data.length < PAGE_SIZE) ||
		Boolean(size > 0 && data && error);
	console.log("allPosts>>>>>>", allPosts);
	console.log("data and size>>>>>>", data, size);

	const loadMore = (e) => {
		e.preventDefault();
		setSize((pre) => pre + 1);
	};

	if (isLoading) {
		return <Loader />;
	}

	// const handleUploadFileChange = async (file) => {
	// 	setPhoto(file);
	// };

	const handleUploadFileChange = (file) => {
		setPhotoEdit(file);
	};
	const clearInput = () => {
		setPhoto(null);
		setTitleEdit("");
		setNameEdit("");
		setDescriptionEdit("");
		setContentEdit("");
		setPhotoEdit(null);
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
						const res = await Axios.delete(`/post/${id}`);
						setSize((pre) => pre + 1);
						Swal.fire({
							text: `${res.data.message}`,
							icon: "info",
						}).then(() => {
							// setSize((pre) => pre + 1);
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

	const handleEditSubmit = async (e, currentData) => {
		e.preventDefault();
		const imgUrl = await editPhoto();
		const value = draftToHtml(convertToRaw(contentEdit.getCurrentContent()));
		try {
			console.log("edit row", currentData);
			if (
				titleEdit.trim() === "" ||
				nameEdit.trim() === "" ||
				descriptionEdit.trim() === "" ||
				value.trim() === "" ||
				photoEdit === null
			) {
				handleCloseEdit();
				return Swal.fire({
					text: "Please enter all Post Details",
					animation: true,
					confirmButtonColor: "#0000FF",
					timer: 3000,
				});
			}
			const body = {
				title: titleEdit,
				name: nameEdit,
				description: descriptionEdit,
				content: value,
				photo: photo ? imgUrl : "",
				UserId: user.id,
			};
			const res = await Axios.patch(`/post/${currentData.id}`, body);
			console.log("res client", res);
			clearInput();
			handleCloseEdit();
			Swal.fire({
				text: "Post Edited Successfully",
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
									<Title>All Posts</Title>

									<Stack spacing={2}>
										<Item></Item>
										<Item>
											<Link
												to="/dashboard/create-post-admin"
												style={{ textDecoration: "none", color: "black" }}
											>
												<Button variant="contained" startIcon={<Add />}>
													Add Post
												</Button>
											</Link>
										</Item>
									</Stack>

									{/* Edit Post Modal */}
									<Modal
										open={openEdit}
										onClose={handleCloseEdit}
										aria-labelledby="modal-modal-title"
										aria-describedby="modal-modal-description"
										sx={{
											minWidth: "600px",
											alignItems: "center",
											justifyContent: "center",
											margin: "auto",
										}}
									>
										<Box sx={modalStyles}>
											<label className="mt-4">Title:</label>
											<Input
												type="text"
												label="Title"
												id="title"
												name="title"
												className="bordered form-control"
												placeholder="Enter Post Title"
												value={titleEdit}
												onChange={(e) => setTitleEdit(e.target.value)}
											/>
											<label className="mt-4">Full Name:</label>
											<Input
												type="text"
												label="Name"
												id="name"
												name="name"
												className="bordered form-control"
												placeholder="Enter Post Name"
												value={nameEdit}
												onChange={(e) => setNameEdit(e.target.value)}
											/>
											<label className="mt-4">Description:</label>
											<Input
												type="text"
												label="Description"
												id="description"
												name="description"
												className="bordered form-control"
												placeholder="Enter Post Description"
												value={descriptionEdit}
												onChange={(e) => setDescriptionEdit(e.target.value)}
											/>
											<label className="mt-4">Content:</label>

											<Editor
												editorState={contentEdit}
												onEditorStateChange={onEditorStateChange}
												wrapperStyle={{
													border: "1px solid black",
													minHeight: 200,
												}}
												toolbarClassName="toolbarClassName"
												wrapperClassName="demo-wrapper"
												editorClassName="demo-editor"
											/>
											<label className="mt-4">Photo:</label>
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
												Edit Post
											</Button>
										</Box>
									</Modal>
									<TableContainer component={Paper}>
										<Table sx={{ minWidth: 650 }} aria-label="simple table">
											<TableHead>
												<TableRow>
													<TableCell>S/N</TableCell>
													<TableCell align="center">Title</TableCell>
													<TableCell align="center">Name</TableCell>

													<TableCell align="center">Description</TableCell>
													<TableCell align="center">Content</TableCell>
													<TableCell align="center">Photo</TableCell>

													<TableCell align="center">Action</TableCell>
												</TableRow>
											</TableHead>
											<TableBody>
												{allPosts.map((row, i) => (
													<TableRow
														key={row.id}
														sx={{
															"&:last-child td, &:last-child th": { border: 0 },
														}}
													>
														<TableCell sx={{ width: "10px" }}>
															{i + 1}
														</TableCell>
														<TableCell align="center">{row.title}</TableCell>
														<TableCell align="center">{row.name}</TableCell>

														<TableCell align="center">
															{row.description}
														</TableCell>
														<TableCell align="center">
															<Truncate
																lines={3}
																dangerouslySetInnerHTML={{
																	__html: row.content,
																}}
															/>
														</TableCell>
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

export default Posts;
