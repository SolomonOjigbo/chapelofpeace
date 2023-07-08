import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid"; // Grid version 1
import Button from "@mui/material/Button";
import PaystackPop from "@paystack/inline-js";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import {
	Box,
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup,
	TextField,
	Typography,
} from "@mui/material";
import Axios from "../config";
import Swal from "sweetalert2";
import { validateEmail } from "../utils";
import { Container } from "@mui/system";

function Givings() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone_no, setPhone] = useState("");
	const [amount, setAmount] = useState("");
	const [purpose, setPurpose] = useState("offering");
	const [gateway, setGateway] = useState("Paystack");
	const [details, setDetails] = useState("");

	const config = {
		public_key: process.env.REACT_APP_FLUTTERWAVE_PUBLIC_KEY,
		tx_ref: Date.now(),
		amount: amount,
		currency: "NGN",
		payment_options: "card,mobilemoney,ussd",
		customer: {
			email,
			phone_number: phone_no,
			name,
		},
		customizations: {
			title: purpose,
			description: details,
			logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
		},
	};

	const handleFlutterPayment = useFlutterwave(config);

	const handlePaymentMethod = (event) => {
		setGateway(event.target.value);
	};

	// const handleAmountChange = (e) => {
	// 	const regex = /^[0-9\b]+$/;
	// 	if (e.target.value === "" || regex.test(e.target.value)) {
	// 		setAmount(e.target.value);
	// 	}
	// };

	const clearInput = () => {
		setName("");
		setPhone("");
		setPurpose("");
		setAmount("");
		setGateway("");
		setDetails("");
		setEmail("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			let isError = false;
			if (name.trim() === "") {
				return Swal.fire({
					text: "Please enter your full name",
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}
			if (!validateEmail(email.trim())) {
				return Swal.fire({
					text: "Please enter a valid email address",
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}
			if (purpose.trim() === "") {
				return Swal.fire({
					text: "Please enter a purpose",
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}
			if (amount.trim() === "") {
				return Swal.fire({
					text: "Please enter your desired amount",
					toast: true,
					confirmButtonColor: "#0000FF",
				});
			}
			if (isError) return false;
			const body = {
				name,
				email,
				purpose,
				amount,
				phone_no,
				gateway,
				details,
			};

			if (body.gateway === "paystack") {
				const paystack = new PaystackPop();
				paystack.newTransaction({
					key: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
					amount: amount * 100,
					name,
					email,
					purpose,
					phone_no,
					onSuccess(transaction) {
						Axios.post("/donations", body);
						Swal.fire({
							text: `Payment Completed! Reference: ${transaction.reference}`,
							icon: "success",
							animation: true,
							confirmButtonColor: "#0000FF",
						});
					},
					onCancel() {
						alert("You have canceled the transaction!");
					},
				});
			} else if (body.gateway === "flutterwave") {
				handleFlutterPayment({
					callback: async (response) => {
						await Axios.post("/donations", body);
						Swal.fire({
							text: `Payment Completed! Transaction Reference: ${response.transaction_id}`,
							icon: "success",
							animation: true,
							confirmButtonColor: "#0000FF",
						});

						closePaymentModal(); // this will close the modal programmatically
					},
					onClose: () => {},
				});
			} else {
				console.log("Please select payment method");
			}
			clearInput();
			window.scrollTo(0, 0);
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<>
			<Box>
				<header className="unitHeader">
					<section className="hero-header">
						<Typography
							variant="h3"
							className="text-center mb-5 allTitles"
							style={{ marginTop: "150px", color: "white" }}
						>
							<strong>Givings and Donations</strong>
						</Typography>
					</section>
				</header>
				<Box
					component="form"
					sx={{
						padding: "15px",
						border: "1px dashed grey",
						maxWidth: "760px",
						alignContent: "center",
						justifyContent: "center",
						alignItems: "center",
						margin: "auto",
					}}
				>
					<Grid
						container
						spacing={1}
						justifyContent="center"
						align="center"
						sx={{ padding: "20px", alignContent: "center" }}
					>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									fullWidth
									required
									id="fullName"
									label="Full Name"
									name="fullName"
									margin="normal"
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									fullWidth
									required
									id="email"
									label="Email"
									name="email"
									className=""
									margin="normal"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									fullWidth
									required
									name="phone"
									label="Phone Number"
									margin="normal"
									value={phone_no}
									onChange={(e) => setPhone(e.target.value)}
									placeholder="Phone Number (+234)"
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									fullWidth
									type="number"
									required
									label="Amount (NGN)"
									margin="normal"
									value={amount}
									onChange={(e) => setAmount(e.target.value)}
									inputProps={{ maxLength: 12 }}
									placeholder="Amount (NGN)"
								/>
							</Grid>

							<Grid
								container
								align="left"
								style={{ marginTop: 20, padding: 10 }}
							>
								<Grid container alignContent="center" style={{ padding: 10 }}>
									<Grid item xs={3}>
										<Typography variant="h6">Purpose of Giving:</Typography>
									</Grid>
									<Grid item xs={9}>
										<FormControl>
											<RadioGroup
												align="center"
												row
												name="row-radio-buttons-group"
												value={purpose}
												onChange={handlePaymentMethod}
											>
												<FormControlLabel
													value="offering"
													control={<Radio />}
													onChange={(e) => setPurpose(e.target.value)}
													label="Offering"
												/>

												<FormControlLabel
													value="tithe"
													control={<Radio />}
													onChange={(e) => setPurpose(e.target.value)}
													label="Tithe"
												/>

												<FormControlLabel
													value="building project"
													control={<Radio />}
													onChange={(e) => setPurpose(e.target.value)}
													label="Building Project"
												/>

												<FormControlLabel
													value="welfare"
													control={<Radio />}
													onChange={(e) => setPurpose(e.target.value)}
													label="Welfare"
												/>
											</RadioGroup>
										</FormControl>
									</Grid>
								</Grid>
								<Grid container style={{ padding: 10 }}>
									<Grid item xs={3}>
										<Typography variant="h6">Select Payment Method:</Typography>
									</Grid>
									<Grid item xs={9}>
										<FormControl>
											<RadioGroup
												align="center"
												row
												name="row-radio-buttons-group"
												value={gateway}
												onChange={handlePaymentMethod}
											>
												<FormControlLabel
													value="flutterwave"
													control={<Radio />}
													label="Flutterwave"
												/>
												<FormControlLabel
													value="paystack"
													control={<Radio />}
													label="Paystack"
												/>
											</RadioGroup>
										</FormControl>
									</Grid>
								</Grid>
								<Grid container style={{ padding: 10 }} columns={10}>
									<TextField
										fullWidth
										required
										label="Your Comments"
										margin="normal"
										onChange={(e) => setDetails(e.target.value)}
										value={details}
										placeholder="Enter Your Comments"
									/>
								</Grid>
							</Grid>

							<Grid
								alignContent="center"
								container
								spacing={1}
								columns={12}
								justifyContent="center"
							>
								<Grid item xs={12} sm={12} md={12}>
									<Grid
										container
										direction="row"
										spacing={2}
										style={{ marginTop: 20 }}
									>
										<Grid item align="center">
											<Button
												variant="contained"
												size="large"
												color="warning"
												align="center"
												onClick={clearInput}
											>
												Reset
											</Button>
										</Grid>
										<Grid item>
											<Button
												variant="contained"
												size="large"
												color="success"
												align="center"
												onClick={handleSubmit}
											>
												Pay
											</Button>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Box>
				<Typography
					variant="h4"
					className="text-center mt-5 mb-5 allTitles"
					style={{
						marginTop: "140px",
						background: `linear-gradient(rgba(0, 72, 6, 0.8), rgb(192, 72, 72, 0.8)), url("https://ik.imagekit.io/ikmedia/blog/hero-image.jpeg")`,
						color: "white",
						height: "200px",
						width: "100%",
						paddingTop: "70px",
					}}
				>
					<strong>Thank you for giving!</strong>
				</Typography>
			</Box>
		</>
	);
}

export default Givings;
