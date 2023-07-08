"use strict";

require("dotenv").config();

var express = require("express");

var cors = require("cors");

var compression = require("compression");

var http = require("http");

var helmet = require("helmet");

var userRoute = require("./routes/user.route");

var alumniAnnouncementsRoute = require("./routes/alumniAnnouncements.route");

var alumniMembershipsRoute = require("./routes/alumniMemberships.route");

var bibleStoriesRoute = require("./routes/bibleStories.route");

var bibleStudiesRoute = require("./routes/bibleStudies.route");

var bibleStudySchedulesRoute = require("./routes/bibleStudySchedules.route");

var childrenSongsRoute = require("./routes/childrenSongs.route");

var contactUsRoute = require("./routes/contactUs.route");

var donationsRoute = require("./routes/donations.route");

var meditationsRoute = require("./routes/meditations.route");

var membershipsRoute = require("./routes/memberships.route");

var membersOfCouncilRoute = require("./routes/membersOfCouncil.route");

var boardOfTrusteesRoute = require("./routes/boardOfTrustees.route");

var memoryVerseRoute = require("./routes/memoryVerse.route");

var partnerRoute = require("./routes/partner.route");

var postRoute = require("./routes/post.route");

var prayerMeetingBulletinRoute = require("./routes/prayerMeetingBulletin.route");

var prayerRequestRoute = require("./routes/prayerRequest.route");

var responseRoute = require("./routes/response.route");

var servicesRoute = require("./routes/services.route");

var sliderRoute = require("./routes/slider.route");

var testimonialRoute = require("./routes/testimonial.route");

var unitRoute = require("./routes/unit.route");

var childrenStoriesRoute = require("./routes/childrenStories.route");

var eventsRoute = require("./routes/events.route");

var liveStreamingRoute = require("./routes/liveStreaming.route"); // const fileUploadRoute = require("./routes/fileUpload.route");


var _require = require("./config"),
    port = _require.port,
    origin = _require.origin;

var dbRoute = require("./routes/db.route");

var newOrigin = [origin, "https://res.cloudinary.com", "*"];
var app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cors());
app.use(compression());
app.use(helmet());
app.use("/api", userRoute);
app.use("/api", alumniAnnouncementsRoute);
app.use("/api", alumniMembershipsRoute);
app.use("/api", bibleStoriesRoute);
app.use("/api", bibleStudiesRoute);
app.use("/api", bibleStudySchedulesRoute);
app.use("/api", childrenSongsRoute);
app.use("/api", contactUsRoute);
app.use("/api", donationsRoute);
app.use("/api", meditationsRoute);
app.use("/api", membershipsRoute);
app.use("/api", membersOfCouncilRoute);
app.use("/api", boardOfTrusteesRoute);
app.use("/api", memoryVerseRoute);
app.use("/api", partnerRoute);
app.use("/api", postRoute);
app.use("/api", prayerMeetingBulletinRoute);
app.use("/api", prayerRequestRoute);
app.use("/api", responseRoute);
app.use("/api", servicesRoute);
app.use("/api", sliderRoute);
app.use("/api", testimonialRoute);
app.use("/api", unitRoute);
app.use("/api", childrenStoriesRoute);
app.use("/api", eventsRoute);
app.use("/api", liveStreamingRoute); // app.use("/api", fileUploadRoute);

app.use("/api", dbRoute);
var server = http.createServer(app);
server.listen(port, function () {
  console.log("Server listening on port 5000");
});