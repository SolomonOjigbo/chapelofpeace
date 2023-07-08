import "./App.css";
import { createContext, useEffect, useState, lazy, Suspense } from "react";
import ReactSwitch from "react-switch";
import { LoadingOutlined } from "@ant-design/icons";
import NavBarOffCanvas from "./components/NavBarOffCanvas.js";
import { Routes, Route, Navigate } from "react-router-dom";
import Footer from "../src/components/Footer";
import { isAuthPath } from "./utils";
import Swal from "sweetalert2";
import SinglePost from "./pages/SinglePost";
import { ProtectedRoute } from "./ProtectedRoute";
import { SuperAdmin } from "./SuperAdmin";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import { logout } from "./lib/auth";

//using lazy
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Units = lazy(() => import("./pages/Units"));
const Projects = lazy(() => import("./pages/Projects"));
const LiveStreaming = lazy(() => import("./pages/LiveStreaming"));
const Partners = lazy(() => import("./pages/Partners"));
const Contact = lazy(() => import("./pages/Contact"));
const Givings = lazy(() => import("./pages/Givings"));
const Membership = lazy(() => import("./pages/Membership"));
const ResponseForm = lazy(() => import("./pages/ResponseForm"));
const BibleStudy = lazy(() => import("./pages/BibleStudy"));
const Prayer = lazy(() => import("./pages/Prayer"));
const ChildrenUnit = lazy(() => import("./pages/ChildrenUnit"));
const Alumni = lazy(() => import("./pages/Alumni"));
const AlumniMembership = lazy(() => import("./pages/AlumniMembership"));
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Dashboard = lazy(() => import("./admin/Dashboard"));
const AlumniMembershipAdmin = lazy(() =>
	import("./admin/pages/AlumniMemberships")
);
const AlumniAnnouncementAdmin = lazy(() =>
	import("./admin/pages/AlumniAnnouncement")
);
const BibleStoryAdmin = lazy(() => import("./admin/pages/BibleStory"));
const BibleStudyAdmin = lazy(() => import("./admin/pages/BibleStudy"));
const BibleStudyScheduleAdmin = lazy(() =>
	import("./admin/pages/BibleStudySchedule")
);
const ChildrenSongAdmin = lazy(() => import("./admin/pages/ChildrenSong"));
const ChildrenStoryAdmin = lazy(() => import("./admin/pages/ChildrenStory"));
const ContactUsAdmin = lazy(() => import("./admin/pages/ContactUs"));
const DonationsAdmin = lazy(() => import("./admin/pages/Donations"));
const MeditationAdmin = lazy(() => import("./admin/pages/Meditation"));
const MembershipAdmin = lazy(() => import("./admin/pages/Membership"));
const MembersOfCouncilAdmin = lazy(() =>
	import("./admin/pages/MembersOfCouncil")
);
const BoardOfTrusteesAdmin = lazy(() =>
	import("./admin/pages/BoardOfTrustees")
);
const MemoryVerseAdmin = lazy(() => import("./admin/pages/MemoryVerse"));
const PartnersAdmin = lazy(() => import("./admin/pages/Partners"));
const PostsAdmin = lazy(() => import("./admin/pages/Posts"));
const PrayerMeetingAdmin = lazy(() => import("./admin/pages/PrayerMeeting"));
const PrayerRequestAdmin = lazy(() => import("./admin/pages/PrayerRequest"));
const ResponseFormAdmin = lazy(() => import("./admin/pages/ResponseForm"));
const ServicesAdmin = lazy(() => import("./admin/pages/Services"));
const SlidersAdmin = lazy(() => import("./admin/pages/Sliders"));
const TestimonialsAdmin = lazy(() => import("./admin/pages/Testimonials"));
const Users = lazy(() => import("./admin/pages/Users"));
const UnitsAdmin = lazy(() => import("./admin/pages/Units"));
const EventsAdmin = lazy(() => import("./admin/pages/Events"));
const LiveStreamingAdmin = lazy(() => import("./admin/pages/LiveStreaming"));
const CreatePostAdmin = lazy(() => import("./admin/pages/CreatePost"));

export const ThemeContext = createContext(null);

function App() {
	const { user } = useSelector(selectUser);
	console.log("User:", user);
	useEffect(() => {
		window.scrollTo(0, 0);
		if (user) {
			setTimeout(function () {
				let timerInterval;
				Swal.fire({
					title: "Auto Logout alert!",
					html:
						"You would be logged out in <strong></strong> seconds.<br/><br/>" +
						'<button id="stop" className="btn btn-danger">' +
						"Logout!!" +
						"</button>",
					allowEscapeKey: false,
					allowOutsideClick: false,
					timer: 10000,
					didOpen: () => {
						const content = Swal.getHtmlContainer();
						const $ = content.querySelector.bind(content);

						const stop = $("#stop");

						Swal.showLoading();

						function toggleButtons() {
							stop.disabled = !Swal.isTimerRunning();
						}

						stop.addEventListener("click", () => {
							Swal.fire({
								title: "Session Ended!",
								text: "You have been logged out successfully",
								icon: "success",
								confirmButtonColor: "#0000FF",
							});
							Swal.stopTimer();
							logout();
							toggleButtons();
						});

						timerInterval = setInterval(() => {
							Swal.getHtmlContainer().querySelector("strong").textContent = (
								Swal.getTimerLeft() / 1000
							).toFixed(0);
						}, 100);
					},
					willClose: () => {
						Swal.fire({
							title: "Session Ended!",
							text: "You have been logged out successfully",
							icon: "success",
							confirmButtonColor: "#0000FF",
						});
						clearInterval(timerInterval);
						logout();
					},
				});
			}, 18000000000);
		}
	}, [user]);

	const [theme, setTheme] = useState("dark");

	const toggleTheme = () => {
		setTheme((curr) => (curr === "light" ? "dark" : "light"));
	};

	return (
		<Suspense
			fallback={
				<div className="col text-center p-5">
					<LoadingOutlined style={{ fontSize: 50, color: "blue" }} spin />
				</div>
			}
		>
			<ThemeContext.Provider value={{ theme, toggleTheme }}>
				<div className="App" id={theme}>
					{isAuthPath && <NavBarOffCanvas />}
					<main>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/about" element={<About />} />
							<Route path="/units" element={<Units />} />
							<Route path="/partners" element={<Partners />} />
							<Route path="/single-post/:id" element={<SinglePost />} />
							<Route path="/projects" element={<Projects />} />
							<Route path="/contact" element={<Contact />} />
							<Route path="/givings" element={<Givings />} />
							<Route path="/livestreaming" element={<LiveStreaming />} />
							<Route path="/membership" element={<Membership />} />
							<Route path="/response-form" element={<ResponseForm />} />
							<Route path="/bible-study" element={<BibleStudy />} />
							<Route path="/prayer" element={<Prayer />} />
							<Route path="/children-unit" element={<ChildrenUnit />} />
							<Route path="/alumni" element={<Alumni />} />
							<Route path="/alumni-membership" element={<AlumniMembership />} />
							<Route path="/login" element={<Login />} />
							{/* <Route path='/logout' element={logout()} /> */}
							<Route path="/register" element={<SignUp />} />

							<Route
								path="/dashboard"
								element={
									<ProtectedRoute user={user}>
										<Dashboard />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/dashboard/alumni-membership-admin"
								element={
									<ProtectedRoute user={user}>
										<AlumniMembershipAdmin />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/dashboard/alumni-announcement-admin"
								element={
									<ProtectedRoute user={user}>
										<AlumniAnnouncementAdmin />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/dashboard/bible-story-admin"
								element={
									<ProtectedRoute user={user}>
										<BibleStoryAdmin />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/dashboard/bible-study-admin"
								element={
									<ProtectedRoute user={user}>
										<BibleStudyAdmin />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/dashboard/bible-study-schedule-admin"
								element={
									<ProtectedRoute user={user}>
										<BibleStudyScheduleAdmin />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/dashboard/children-song-admin"
								element={
									<ProtectedRoute user={user}>
										<ChildrenSongAdmin />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/dashboard/children-story-admin"
								element={
									<ProtectedRoute user={user}>
										<ChildrenStoryAdmin />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/dashboard/contact-us-admin"
								element={
									<ProtectedRoute user={user}>
										<ContactUsAdmin />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/dashboard/donations-admin"
								element={
									<ProtectedRoute user={user}>
										<DonationsAdmin />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/dashboard/live-streaming-admin"
								element={
									<ProtectedRoute user={user}>
										<LiveStreamingAdmin />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/dashboard/meditation-admin"
								element={
									<ProtectedRoute user={user}>
										<MeditationAdmin />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/dashboard/membership-admin"
								element={
									<ProtectedRoute user={user}>
										<MembershipAdmin />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/dashboard/members-of-council-admin"
								element={
									<ProtectedRoute user={user}>
										<MembersOfCouncilAdmin />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/dashboard/board-of-trustees-admin"
								element={
									<ProtectedRoute user={user}>
										<BoardOfTrusteesAdmin />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/dashboard/memory-verse-admin"
								element={
									<ProtectedRoute user={user}>
										<MemoryVerseAdmin />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/dashboard/partners-admin"
								element={
									<ProtectedRoute user={user}>
										<PartnersAdmin />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/dashboard/posts-admin"
								element={
									<ProtectedRoute user={user}>
										<PostsAdmin />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/dashboard/prayer-meeting-admin"
								element={
									<ProtectedRoute user={user}>
										<PrayerMeetingAdmin />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/dashboard/prayer-request-admin"
								element={
									<ProtectedRoute user={user}>
										<PrayerRequestAdmin />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/dashboard/response-form-admin"
								element={
									<ProtectedRoute user={user}>
										<ResponseFormAdmin />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/dashboard/services-admin"
								element={
									<ProtectedRoute user={user}>
										<ServicesAdmin />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/dashboard/sliders-admin"
								element={
									<ProtectedRoute user={user}>
										<SlidersAdmin />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/dashboard/testimonials-admin"
								element={
									<ProtectedRoute user={user}>
										<TestimonialsAdmin />
									</ProtectedRoute>
								}
							/>

							<Route
								path="/dashboard/units-admin"
								element={
									<ProtectedRoute user={user}>
										<UnitsAdmin />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/dashboard/events-admin"
								element={
									<ProtectedRoute user={user}>
										<EventsAdmin />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/dashboard/create-post-admin"
								element={
									<ProtectedRoute user={user}>
										<CreatePostAdmin />
									</ProtectedRoute>
								}
							/>

							<Route
								path="dashboard/users-admin"
								element={
									<SuperAdmin user={user}>
										<Users />
									</SuperAdmin>
								}
							/>

							<Route path="*" element={<Navigate to="/" replace />} />
						</Routes>
					</main>
					<div className="switch">
						<ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
					</div>
				</div>
				<Footer />
			</ThemeContext.Provider>
		</Suspense>
	);
}

export default App;
