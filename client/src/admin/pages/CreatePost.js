import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Title from "../components/Title";
import draftToHtml from "draftjs-to-html";
import {
	// Avatar,
	Box,
	Button,
	Container,
	Grid,
	Input,
	Paper,
} from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import CreateIcon from "@mui/icons-material/Create";
import Add from "@mui/icons-material/Add";
// import { styled } from "@mui/material/styles";
// import { useEffect } from "react";
// import { useState } from "react";
// import { getPostsSWRCursor } from "../../lib/post";
// import Loader from "../components/Loader";
import Swal from "sweetalert2";
// import useSWRInfinite from "swr/infinite";
import Axios, { SERVER_URL } from "../../config";
import { FileUploader } from "react-drag-drop-files";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

const CreatePost = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const navigate = useNavigate();

	let editorState = EditorState.createEmpty();
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [title, setTitle] = useState("");
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [content, setContent] = useState(editorState);
	const [file, setFile] = useState(null);

	const fileTypes = ["JPEG", "JPG", "PNG", "GIF", "WEBP"];

	const onEditorStateChange = (editorState) => {
		setContent(editorState);
	};

	const handleUploadFileChange = async (file) => {
		setFile(file);

		console.log("file", file);
	};

	const userData = useSelector(selectUser);
	const { user, loading } = userData;

	if (!user) {
		window.location.href = "/login";
	}
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
		setDescription("");
		setContent(null);
		setFile(null);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const imgUrl = await uploadFile();
		const value = draftToHtml(convertToRaw(content.getCurrentContent()));
		console.log(value);
		console.log(imgUrl);
		try {
			if (
				title.trim() === "" ||
				name.trim() === "" ||
				description.trim() === "" ||
				file === null
			) {
				handleClose();
				return Swal.fire({
					text: "Please enter all Post Details",
					animation: true,
					confirmButtonColor: "#0000FF",
					timer: 3000,
				});
			}

			const body = {
				title: title,
				description: description,
				content: value,
				name: name,
				photo: file ? imgUrl : "",
				UserId: user.id,
			};

			const response = await Axios.post("/post", body);
			console.log("post: ", response);
			handleClose();
			Swal.fire({
				text: "Post data sent successfully",
				icon: "success",
				animation: true,
				confirmButtonColor: "#0000FF",
			}).then((res) => {
				console.log(res.data);
				clearInput();
				window.location.href = "/posts-admin";
			});
		} catch (error) {
			console.log(error);
			handleClose();
			return Swal.fire({
				icon: "error",
				text: `${error.message}`,
				animation: true,
				confirmButtonColor: "#0000FF",
			});
		}
		navigate("/posts-admin");
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
									<Title>Add Post</Title>
									<Box component="form">
										<label className="mt-4">Title:</label>
										<Input
											type="text"
											label="Title"
											id="title"
											name="title"
											className="bordered form-control"
											placeholder="Enter Post Title"
											value={title}
											onChange={(e) => setTitle(e.target.value)}
										/>
										<label className="mt-4">Full Name:</label>
										<Input
											type="text"
											label="Name"
											id="name"
											name="name"
											className="bordered form-control"
											placeholder="Enter Post Name"
											value={name}
											onChange={(e) => setName(e.target.value)}
										/>
										<label className="mt-4">Description:</label>
										<Input
											type="text"
											label="Description"
											id="description"
											name="description"
											className="bordered form-control"
											placeholder="Enter Post Description"
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
										<label className="mt-4">Content:</label>
										<Editor
											editorState={content}
											onEditorStateChange={onEditorStateChange}
											wrapperStyle={{
												border: "1px solid black",
												minHeight: 300,
											}}
											toolbarClassName="toolbarClassName"
											wrapperClassName="demo-wrapper"
											editorClassName="demo-editor"
										/>
										<Box sx={{ textAlign: "center" }}>
											<Button
												variant="contained"
												type="submit"
												startIcon={<Add />}
												sx={{ mt: 3 }}
												onClick={handleSubmit}
												align="center"
											>
												Submit
											</Button>
										</Box>
									</Box>
								</Paper>
							</Grid>
						</Grid>
					</Container>
				</Box>
			</Box>
		</>
	);
};

export default CreatePost;
