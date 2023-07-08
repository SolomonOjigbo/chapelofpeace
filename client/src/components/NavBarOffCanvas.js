import React, { useCallback } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo/logo192.png";
import { logout, useUserAuth } from "../lib/auth";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Drawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import HomeIcon from "@mui/icons-material/Home";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import SchoolIcon from "@mui/icons-material/School";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import HandshakeIcon from "@mui/icons-material/Handshake";
import InfoIcon from "@mui/icons-material/Info";
import ChatIcon from "@mui/icons-material/Chat";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import BusinessIcon from "@mui/icons-material/Business";
import ChurchIcon from "@mui/icons-material/Church";
import { ThemeProvider, createTheme } from "@mui/material";
import { useState } from "react";

const appBarTheme = createTheme({
	palette: {
		secondary: {
			main: "#333333",
		},
		primary: {
			main: "#00ff",
		},
	},
});

function NavBarOffCanvas(props) {
	const { user } = useUserAuth();
	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);
	const [anchorElAbout, setAnchorElAbout] = useState(null);
	const [anchorElUnit, setAnchorElUnit] = useState(null);
	const { window } = props;

	const navigate = useNavigate();

	// const handleOpenNavMenu = (event) => {
	// 	setAnchorElNav(event.currentTarget);
	// };
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleOpenAboutMenu = (event) => {
		setAnchorElAbout(event.currentTarget);
	};

	const handleOpenUnitMenu = (event) => {
		setAnchorElUnit(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleCloseAboutMenu = () => {
		setAnchorElAbout(null);
	};

	const handleCloseUnitMenu = () => {
		setAnchorElUnit(null);
	};

	const [open, setOpen] = useState(false);
	const [openUnits, setOpenUnits] = useState(false);

	const handleClick = () => {
		setOpen(!open);
	};

	const clickUnits = () => {
		setOpenUnits(!openUnits);
	};

	const [state, setState] = useState({
		left: false,
	});

	const drawerWidth = 240;
	const toggleDrawer = useCallback(
		(anchor, open) => (event) => {
			if (
				event.type === "keydown" &&
				(event.key === "Tab" || event.key === "Shift")
			) {
				return;
			}

			setState({ ...state, [anchor]: open });
		},
		[state]
	);
	const container =
		window !== undefined ? () => window().document.body : undefined;
	const list = (
		<Box
			open={Boolean(anchorElNav)}
			onClose={handleCloseNavMenu}
			role="presentation"
			onClick={toggleDrawer}
			onKeyDown={toggleDrawer}
		>
			<List>
				<ListItem disablePadding>
					<Link
						to="/"
						style={{
							backgroundColour: "transparent",
							textDecoration: "none",
							color: "black",
						}}
					>
						<ListItemButton>
							<ListItemIcon>
								<HomeIcon />
							</ListItemIcon>
							<ListItemText primary="HOME" />
						</ListItemButton>
					</Link>
				</ListItem>
				<ListItemButton onClick={handleClick}>
					<ListItemIcon>
						<InfoIcon />
					</ListItemIcon>
					<ListItemText primary="ABOUT US" />
					{open ? <ExpandMore /> : <ExpandLess />}
				</ListItemButton>
				<Collapse in={open} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<Link
							to="/about"
							style={{
								backgroundColour: "transparent",
								textDecoration: "none",
								color: "black",
							}}
						>
							<ListItemButton sx={{ pl: 4 }}>
								<ListItemIcon>
									<InfoIcon />
								</ListItemIcon>
								<ListItemText primary="ABOUT" />
							</ListItemButton>
						</Link>

						<Link
							to="/alumni"
							style={{
								backgroundColour: "transparent",
								textDecoration: "none",
								color: "black",
							}}
						>
							<ListItemButton sx={{ pl: 4 }}>
								<ListItemIcon>
									<AnnouncementIcon />
								</ListItemIcon>
								<ListItemText primary="ALUMNI" />
							</ListItemButton>
						</Link>

						<Link
							to="/alumni-membership"
							style={{
								backgroundColour: "transparent",
								textDecoration: "none",
								color: "black",
							}}
						>
							<ListItemButton sx={{ pl: 4 }}>
								<ListItemIcon>
									<SchoolIcon />
								</ListItemIcon>
								<ListItemText primary="ALUMNI MEMBERSHIP" />
							</ListItemButton>
						</Link>

						<Link
							to="/response-form"
							style={{
								backgroundColour: "transparent",
								textDecoration: "none",
								color: "black",
							}}
						>
							<ListItemButton sx={{ pl: 4 }}>
								<ListItemIcon>
									<ChatIcon />
								</ListItemIcon>
								<ListItemText primary="RESPONSE FORM" />
							</ListItemButton>
						</Link>
					</List>
				</Collapse>

				<ListItemButton onClick={clickUnits}>
					<ListItemIcon>
						<BusinessIcon />
					</ListItemIcon>
					<ListItemText primary="UNITS" />
					{openUnits ? <ExpandMore /> : <ExpandLess />}
				</ListItemButton>
				<Collapse in={openUnits} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<Link
							to="/units"
							style={{
								backgroundColour: "transparent",
								textDecoration: "none",
								color: "black",
							}}
						>
							<ListItemButton sx={{ pl: 4 }}>
								<ListItemIcon>
									<BusinessIcon />
								</ListItemIcon>
								<ListItemText primary="UNITS" />
							</ListItemButton>
						</Link>

						<Link
							to="/bible-study"
							style={{
								backgroundColour: "transparent",
								textDecoration: "none",
								color: "black",
							}}
						>
							<ListItemButton sx={{ pl: 4 }}>
								<ListItemIcon>
									<LocalLibraryIcon />
								</ListItemIcon>
								<ListItemText primary="BIBLE STUDY" />
							</ListItemButton>
						</Link>

						<Link
							to="/children-unit"
							style={{
								backgroundColour: "transparent",
								textDecoration: "none",
								color: "black",
							}}
						>
							<ListItemButton sx={{ pl: 4 }}>
								<ListItemIcon>
									<ChildCareIcon />
								</ListItemIcon>
								<ListItemText primary="CHILDREN UNIT" />
							</ListItemButton>
						</Link>

						<Link
							to="/prayer"
							style={{
								backgroundColour: "transparent",
								textDecoration: "none",
								color: "black",
							}}
						>
							<ListItemButton sx={{ pl: 4 }}>
								<ListItemIcon>
									<ChurchIcon />
								</ListItemIcon>
								<ListItemText primary="PRAYERS" />
							</ListItemButton>
						</Link>
					</List>
				</Collapse>

				<ListItem disablePadding>
					<Link
						to="/partners"
						style={{
							backgroundColour: "transparent",
							textDecoration: "none",
							color: "black",
						}}
					>
						<ListItemButton>
							<ListItemIcon>
								<HandshakeIcon />
							</ListItemIcon>
							<ListItemText primary="PARTNERSHIPS" />
						</ListItemButton>
					</Link>
				</ListItem>
				<ListItem disablePadding>
					<Link
						to="/contact"
						style={{
							backgroundColour: "transparent",
							textDecoration: "none",
							color: "black",
						}}
					>
						<ListItemButton>
							<ListItemIcon>
								<ConnectWithoutContactIcon />
							</ListItemIcon>
							<ListItemText primary="CONTACT" />
						</ListItemButton>
					</Link>
				</ListItem>

				<ListItem disablePadding>
					<Link
						to="/givings"
						style={{
							backgroundColour: "transparent",
							textDecoration: "none",
							color: "black",
						}}
					>
						<ListItemButton>
							<ListItemIcon>
								<AttachMoneyIcon />
							</ListItemIcon>
							<ListItemText primary="GIVINGS" />
						</ListItemButton>
					</Link>
				</ListItem>
			</List>
		</Box>
	);

	return (
		<ThemeProvider theme={appBarTheme}>
			<AppBar position="static" color="secondary">
				<Container maxWidth="xl">
					<Toolbar disableGutters>
						<Typography
							variant="h6"
							noWrap
							component="a"
							href="/"
							sx={{
								mr: 2,
								display: { xs: "none", md: "flex" },
								fontFamily: "monospace",
								fontWeight: 700,
								letterSpacing: ".3rem",
								color: "inherit",
								textDecoration: "none",
							}}
						>
							<img
								src={Logo}
								alt="Chapel of Peace FUW"
								width="60"
								height="60"
							/>
						</Typography>

						<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
							<Typography
								variant="h5"
								noWrap
								component="a"
								href="/"
								sx={{
									mr: 2,
									display: { xs: "flex", md: "none" },
									flexGrow: 1,
									fontFamily: "monospace",
									fontWeight: 700,
									letterSpacing: ".3rem",
									color: "inherit",
									textDecoration: "none",
								}}
							>
								<img
									src={Logo}
									alt="Chapel of Peace FUW"
									width="60"
									height="60"
								/>
							</Typography>
							{[""].map((anchor) => (
								<React.Fragment key={anchor}>
									<IconButton
										size="large"
										aria-label="mobile menu"
										aria-controls="menu-appbar"
										aria-haspopup="true"
										onClick={toggleDrawer(anchor, true)}
										color="inherit"
									>
										<MenuIcon />
										{anchor}
									</IconButton>
									<Drawer
										container={container}
										anchor="left"
										open={state[anchor]}
										onClose={toggleDrawer(anchor, false)}
										ModalProps={{
											keepMounted: true, // Better open performance on mobile.
										}}
										sx={{
											display: { xs: "block", sm: "none" },
											"& .MuiDrawer-paper": {
												boxSizing: "border-box",
												width: drawerWidth,
											},
										}}
									>
										{list}
									</Drawer>
								</React.Fragment>
							))}
						</Box>

						<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
							<Button sx={{ my: 2, color: "white", display: "block" }}>
								<Link
									to="/"
									style={{
										backgroundColour: "transparent",
										textDecoration: "none",
										color: "white",
									}}
								>
									HOME
								</Link>
							</Button>

							<Tooltip title="About Us">
								<Button
									onClick={handleOpenAboutMenu}
									sx={{ my: 2, color: "white", display: "block" }}
								>
									ABOUT US
								</Button>
							</Tooltip>

							<Menu
								sx={{ mt: "45px" }}
								id="menu-appbar"
								anchorEl={anchorElAbout}
								anchorOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								open={Boolean(anchorElAbout)}
								onClose={handleCloseAboutMenu}
							>
								<MenuItem component="a" onClick={() => setAnchorElAbout(null)}>
									<Typography
										onClick={() => navigate("/about")}
										style={{
											backgroundColour: "transparent",
											textDecoration: "none",
											color: "black",
										}}
									>
										ABOUT
									</Typography>
								</MenuItem>
								<MenuItem component="a" onClick={() => setAnchorElAbout(null)}>
									<Typography
										onClick={() => navigate("/alumni")}
										style={{
											backgroundColour: "transparent",
											textDecoration: "none",
											color: "black",
										}}
									>
										ALUMNI
									</Typography>
								</MenuItem>
								<MenuItem component="a" onClick={() => setAnchorElAbout(null)}>
									<Typography
										onClick={() => navigate("/alumni-membership")}
										style={{
											backgroundColour: "transparent",
											textDecoration: "none",
											color: "black",
										}}
									>
										ALUMNI MEMBERSHIPS
									</Typography>
								</MenuItem>
								<MenuItem component="a" onClick={() => setAnchorElAbout(null)}>
									<Typography
										onClick={() => navigate("/response-form")}
										style={{
											backgroundColour: "transparent",
											textDecoration: "none",
											color: "black",
										}}
									>
										RESPONSE FORM
									</Typography>
								</MenuItem>
								<MenuItem component="a" onClick={() => setAnchorElAbout(null)}>
									<Typography
										onClick={() => navigate("/membership")}
										style={{
											backgroundColour: "transparent",
											textDecoration: "none",
											color: "black",
										}}
									>
										MEMBERSHIP REGISTRATION
									</Typography>
								</MenuItem>
							</Menu>

							<Tooltip title="Units">
								<Button
									onClick={handleOpenUnitMenu}
									sx={{ my: 2, color: "white", display: "block" }}
								>
									UNITS
								</Button>
							</Tooltip>
							<Menu
								sx={{ mt: "45px" }}
								id="menu-appbar"
								anchorEl={anchorElUnit}
								anchorOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								open={Boolean(anchorElUnit)}
								onClose={handleCloseUnitMenu}
							>
								<MenuItem component="a" onClick={() => setAnchorElUnit(null)}>
									<Typography
										onClick={() => navigate("/bible-study")}
										style={{
											backgroundColour: "transparent",
											textDecoration: "none",
											color: "black",
										}}
									>
										BIBLE STUDY
									</Typography>
								</MenuItem>
								<MenuItem component="a" onClick={() => setAnchorElUnit(null)}>
									<Typography
										onClick={() => navigate("/children-unit")}
										style={{
											backgroundColour: "transparent",
											textDecoration: "none",
											color: "black",
										}}
									>
										CHILDREN UNIT
									</Typography>
								</MenuItem>
								<MenuItem component="a" onClick={() => setAnchorElUnit(null)}>
									<Typography
										onClick={() => navigate("/prayer")}
										style={{
											backgroundColour: "transparent",
											textDecoration: "none",
											color: "black",
										}}
									>
										PRAYER
									</Typography>
								</MenuItem>
							</Menu>
							<Button sx={{ my: 2, color: "white", display: "block" }}>
								<Link
									to="/partners"
									style={{
										backgroundColour: "transparent",
										textDecoration: "none",
										color: "white",
									}}
								>
									PARTNERS
								</Link>
							</Button>
							<Button
								onClick={handleCloseNavMenu}
								sx={{ my: 2, color: "white", display: "block" }}
							>
								<Link
									to="/projects"
									style={{
										backgroundColour: "transparent",
										textDecoration: "none",
										color: "white",
									}}
								>
									PROJECTS
								</Link>
							</Button>
							<Button
								onClick={handleCloseNavMenu}
								sx={{ my: 2, color: "white", display: "block" }}
							>
								<Link
									to="/livestreaming"
									style={{
										backgroundColour: "transparent",
										textDecoration: "none",
										color: "white",
									}}
								>
									LiveStreaming
								</Link>
							</Button>
							<Button
								onClick={handleCloseNavMenu}
								sx={{ my: 2, color: "white", display: "block" }}
							>
								<Link
									to="/contact"
									style={{
										backgroundColour: "transparent",
										textDecoration: "none",
										color: "white",
									}}
								>
									CONTACT
								</Link>
							</Button>
							<Button
								variant="contained"
								sx={{
									my: 2,
									color: "white",
									display: "block",
								}}
							>
								<Link
									to="/givings"
									style={{
										textDecoration: "none",
										color: "white",
									}}
								>
									{" "}
									GIVINGS{" "}
								</Link>
							</Button>
						</Box>

						<Box sx={{ flexGrow: 0 }}>
							{user && (
								<Tooltip title="Open settings">
									<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
										<Avatar
											alt={
												user
													? user.name.substring(0, user.name.indexOf(" "))
													: "User"
											}
											src="/static/images/avatar/2.jpg"
										/>
									</IconButton>
								</Tooltip>
							)}
							<Menu
								sx={{ mt: "45px" }}
								id="menu-appbar"
								anchorEl={anchorElUser}
								anchorOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}
							>
								<MenuItem onClick={handleCloseUserMenu}>
									{user && (
										<>
											<DashboardIcon />
											<Link
												to="dashboard"
												style={{
													backgroundColour: "transparent",
													textDecoration: "none",
													color: "black",
												}}
											>
												Dashboard
											</Link>
										</>
									)}
								</MenuItem>
								<MenuItem onClick={handleCloseUserMenu}>
									{user && (
										<>
											<LogoutIcon />
											<Link
												to="/login"
												onClick={() => logout()}
												style={{
													backgroundColour: "transparent",
													textDecoration: "none",
													color: "black",
												}}
											>
												Logout
											</Link>
										</>
									)}
								</MenuItem>
								<MenuItem onClick={handleCloseUserMenu}>
									{user && (
										<>
											<HowToRegIcon />
											<Link
												to="register"
												style={{
													backgroundColour: "transparent",
													textDecoration: "none",
													color: "black",
												}}
											>
												Register
											</Link>
										</>
									)}
								</MenuItem>
							</Menu>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
		</ThemeProvider>
	);
}
export default NavBarOffCanvas;
