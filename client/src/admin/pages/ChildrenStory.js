import React, { useEffect } from "react";
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
import { useState } from "react";
import Axios from "../../config";
import { FileUploader } from "react-drag-drop-files";
import { getChildrenStorySWRCursor } from "../../lib/childrenStory";
import axios from "axios";

const ChildrenStory = () => {
	// const { data, error, isLoading, mutate } = useUserAuth()
	// if (!data) {
	//   window.location.href = '/login'
	// }

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const Item = styled(Paper)(({ theme }) => ({
		backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
		...theme.typography.body2,
		padding: theme.spacing(1),
		textAlign: "center",
		color: theme.palette.text.secondary,
	}));

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

	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [openEdit, setOpenEdit] = React.useState(false);
	const handleOpenEdit = () => setOpenEdit(true);
	const handleCloseEdit = () => setOpenEdit(false);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [author, setAuthor] = useState("");
	const [file, setFile] = useState(null);
	const [titleEdit, setTitleEdit] = useState("");
	const [descriptionEdit, setDescriptionEdit] = useState("");
	const [authorEdit, setAuthorEdit] = useState("");
	const [currentData, setCurrentData] = useState({});
	const fileTypes = ["JPEG", "PNG", "GIF", "JPG"];

	const getKey = (pageIndex, previousPageData) => {
		//if no user or reached the end, do not fetch
		if (previousPageData && !previousPageData.data) return null;

		//first page, we do not
		if (pageIndex === 0)
			return { path: "/children-stories", cursor: 0, limit: PAGE_SIZE };

		//add the cursor to the API e
		console.log(previousPageData.nextCursor);
		return {
			path: "/children-stories",
			cursor: previousPageData.nextCursor,
			limit: PAGE_SIZE,
		};
	};

	const { data, size, setSize, error, mutate } = useSWRInfinite(
		getKey,
		getChildrenStorySWRCursor
	);
	const isLoading = !data && !error;
	const isLoadingMore =
		isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
	const allChildrenStory = data
		? data.reduce((prev, curr) => [...prev, ...curr.data], [])
		: [];
	const totalChildrenStory = allChildrenStory.length;
	const isEmpty = !data ? true : data?.[0]?.data.length === 0;
	const isReachingEnd =
		isEmpty ||
		(data && data[size - 1]?.data.length < PAGE_SIZE) ||
		Boolean(size > 0 && data && error);
	console.log("allChildrenStory>>>>>>", allChildrenStory);
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
		setFile(null);
		setAuthor("");
		setDescription("");
		setTitleEdit("");
		setAuthorEdit("");
		setDescriptionEdit("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const imgUrl = await uploadFile();
		try {
			if (
				title.trim() === "" ||
				description.trim() === "" ||
				author.trim() === "" ||
				file === null
			) {
				handleClose();
				return Swal.fire({
					text: "Please enter all Children Story Details",
					animation: true,
					confirmButtonColor: "#0000FF",
					timer: 3000,
				});
			}
			const body = {
				title,
				author,
				description,
				photo: imgUrl,
			};
			await Axios.post("/children-stories", body);
			clearInput();
			handleClose();
			Swal.fire({
				text: "Children Story data sent successfully",
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
						const res = await Axios.delete(`/children-stories/${id}`);
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
				titleEdit.trim() === "" ||
				authorEdit.trim() === "" ||
				descriptionEdit.trim() === "" ||
				file === null
			) {
				handleCloseEdit();
				return Swal.fire({
					text: "Please enter all Children Story Details",
					animation: true,
					confirmButtonColor: "#0000FF",
					timer: 3000,
				});
			}
			const body = {
				title: titleEdit,
				author: authorEdit,
				description: descriptionEdit,
				photo: imgUrl,
			};
			const res = await Axios.patch(
				`/children-stories/${currentData.id}`,
				body
			);
			if (res.status === 200) {
				// update the data in the component
				mutate((data) => {
					const updatedData = data.map((item) => {
						if (item._id === currentData._id) {
							return {
								...item,
								title: titleEdit,
								author: authorEdit,
								description: descriptionEdit,
							};
						}
						return item;
					});
					return updatedData;
				}, false);
				setOpenEdit(false);
			}
			console.log("res client", res);
			clearInput();
			handleCloseEdit();
			Swal.fire({
				text: "Children Story Edited Successfully",
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
								<Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
									<Title>All Children Stories</Title>

									<Stack spacing={2}>
										<Item></Item>
										<Item>
											<Button
												variant="contained"
												startIcon={<Add />}
												onClick={handleOpen}
											>
												Add Children Story
											</Button>
										</Item>
									</Stack>
									{/* Add Bible Story Modal */}
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
												placeholder="Enter Bible Story Title"
												value={title}
												onChange={(e) => setTitle(e.target.value)}
											/>
											<label className="mt-4">Author:</label>
											<Input
												type="text"
												label="Author"
												id="author"
												name="author"
												className="bordered form-control"
												placeholder="Enter Children Story Author"
												value={author}
												onChange={(e) => setAuthor(e.target.value)}
											/>
											<label className="mt-4">Description:</label>
											<Input
												type="text"
												label="Description"
												id="description"
												name="description"
												className="bordered form-control"
												placeholder="Enter Children Story Description"
												value={description}
												onChange={(e) => setDescription(e.target.value)}
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
												Add Bible Story
											</Button>
										</Box>
									</Modal>

									{/* Edit Bible Story Modal */}
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
												placeholder="Enter Children Story Title"
												value={titleEdit}
												onChange={(e) => setTitleEdit(e.target.value)}
											/>
											<label className="mt-4">Author:</label>
											<Input
												type="text"
												label="Author"
												id="author"
												name="author"
												className="bordered form-control"
												placeholder="Enter Children Story Author"
												value={authorEdit}
												onChange={(e) => setAuthorEdit(e.target.value)}
											/>
											<label className="mt-4">Description:</label>
											<Input
												type="text"
												label="Description"
												id="description"
												name="description"
												className="bordered form-control"
												placeholder="Enter Children Story Description"
												value={descriptionEdit}
												onChange={(e) => setDescriptionEdit(e.target.value)}
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
												Edit Bible Story
											</Button>
										</Box>
									</Modal>

									<TableContainer component={Paper}>
										<Table sx={{ minWidth: 650 }} aria-label="simple table">
											<TableHead>
												<TableRow>
													<TableCell>S/N</TableCell>
													<TableCell align="center">Title</TableCell>
													<TableCell align="center">Author</TableCell>
													<TableCell align="center">Description</TableCell>
													<TableCell align="center">Photo</TableCell>
													<TableCell align="center">Action</TableCell>
												</TableRow>
											</TableHead>
											<TableBody>
												{allChildrenStory.map((row, i) => (
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
														<TableCell align="center">{row.author}</TableCell>
														<TableCell align="center">
															{row.description}
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

export default ChildrenStory;
