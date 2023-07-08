import { Box, Grid, Link, Typography } from "@mui/material";
import React from "react";
import SocialCard from "../components/SocialCard";
import HomeIcon from "@mui/icons-material/Home";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import { useNavigate } from "react-router-dom";

function Footer() {
	const navigate = useNavigate();

	return (
		<Box sx={{ flexGrow: 1 }}>
			<SocialCard />
			<Grid
				container
				spacing={1}
				columns={12}
				justifyContent="start"
				paddingTop="50px"
				paddingLeft="50px"
				style={{
					backgroundColor: "#ECEFF1",

					paddingBottom: "100px",
				}}
			>
				<Grid item xs={12} sm={12} md={3} marginBottom={3}>
					<Typography variant="h6">INFORMATION</Typography>
					<hr
						className="mb-4 mt-0 d-inline-block mx-auto"
						style={{
							width: "60px",
							backgroundColor: "rgb(142, 223, 142)",
							height: "2px",
						}}
					/>
					<Link underline="hover">
						<Typography onClick={() => navigate("/about")}>About Us</Typography>
					</Link>
					<Typography sx={{ mt: 2 }} onClick={() => navigate("/membership")}>
						<Link underline="hover">Membership Registration</Link>
					</Typography>
					<Typography sx={{ mt: 2 }} onClick={() => navigate("/alumni")}>
						<Link underline="hover">Alumni Corner</Link>
					</Typography>
					<Typography
						sx={{ mt: 2 }}
						onClick={() => navigate("/alumni-membership")}
					>
						<Link underline="hover">Alumni Registration</Link>
					</Typography>
				</Grid>

				<Grid item xs={12} sm={12} md={3}>
					<Typography variant="h6">UNITS</Typography>
					<hr
						className="mb-4 mt-0 d-inline-block mx-auto"
						style={{
							width: "60px",
							backgroundColor: "rgb(142, 223, 142)",
							height: "2px",
						}}
					/>
					<Typography sx={{ mt: 1 }} onClick={() => navigate("/children-unit")}>
						<Link>Children Ministry</Link>
					</Typography>
					<Typography sx={{ mt: 2 }} onClick={() => navigate("/prayer")}>
						<Link to="/prayer">Prayer Unit</Link>
					</Typography>
					{/* <Typography sx={{ mt: 2 }}>
						<Link href="#" underline="hover">
							Welfare
						</Link>
					</Typography>
					<Typography sx={{ mt: 2 }}>
						<Link href="#" underline="hover">
							Counseling
						</Link>
					</Typography>
				*/}
					<Typography sx={{ mt: 2 }} onClick={() => navigate("/bible-study")}>
						<Link underline="hover">Bible study</Link>
					</Typography>
					<Typography sx={{ mt: 2 }} onClick={() => navigate("/response-form")}>
						<Link underline="hover">Response Form</Link>
					</Typography>
				</Grid>

				<Grid
					item
					// align='center'
					xs={12}
					sm={12}
					md={3}
					marginBottom={3}
				>
					<Typography variant="h6">QUICK LINKS</Typography>
					<hr
						className="mb-4 mt-0 d-inline-block mx-auto"
						style={{
							width: "60px",
							backgroundColor: "rgb(142, 223, 142)",
							height: "2px",
						}}
					/>
					<Typography sx={{ mt: 2 }} onClick={() => navigate("/projects")}>
						<Link underline="hover">Church Projects</Link>
					</Typography>

					<Typography sx={{ mt: 2 }} onClick={() => navigate("/partners")}>
						<Link underline="hover">Our Partners</Link>
					</Typography>
					<Typography sx={{ mt: 2 }} onClick={() => navigate("/givings")}>
						<Link underline="hover">Givings and Donation</Link>
					</Typography>
				</Grid>

				<Grid
					item
					// align='center'
					xs={12}
					sm={12}
					md={3}
					// style={{ justifyContent: 'center', alignItems: 'center' }}
				>
					<Typography variant="h6">CONTACT INFO</Typography>
					<hr
						className="mb-4 mt-0 d-inline-block mx-auto"
						style={{
							width: "60px",
							backgroundColor: "rgb(142, 223, 142)",
							height: "2px",
						}}
					/>
					<Typography>
						<HomeIcon />
						Temporary Site: 600 Seater Lecture Hall
						<br />
						Permanent Site: University Chapel Site, Wukari
						<br />
					</Typography>
					<Typography sx={{ mt: 2 }}>
						<EmailIcon />{" "}
						<Link href="email:info@chapelofpeacefuw.org">
							info@chapelofpeacefuw.org
						</Link>
					</Typography>
					<Typography sx={{ mt: 2 }}>
						<PhoneIcon />{" "}
						<Link href="tel:+447723926516"> +234803000000000</Link>
					</Typography>
				</Grid>
			</Grid>
			<Grid
				item
				align="center"
				sx={{ width: "100%" }}
				style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
			>
				{"© "}
				<Link to="/" color="inherit" underline="hover">
					Chapel of Peace FUW
				</Link>{" "}
				{new Date().getFullYear()}
			</Grid>
		</Box>
	);
}

export default Footer;
