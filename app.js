var express = require("express");
var cookieParser = require("cookie-parser");
var path = require("path");
var logger = require("morgan");
var cors = require("cors");
require("dotenv").config();
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var rolesRouter = require("./routes/roles");
var countryRouter = require("./routes/countries");
var stateRouter = require("./routes/states");
var cityRouter = require("./routes/cities");
var schoolRouter = require("./routes/schools");
var classRouter = require("./routes/classes");
var subjectRouter = require("./routes/subjects");
var periodRouter = require("./routes/periods");
var classStudentRouter = require("./routes/classesStudents");
var attendanceRouter = require("./routes/attendances");
var leaveRouter = require("./routes/leaves");
var googleRouter = require("./routes/google");
const passport = require("passport");
const cookieSession = require("cookie-session");
require("./middleware/passport");
// var Email = require("./utils/sendEmail");
// let mailDetails = {
//   from: "amanm4345@gmail.com",
//   to: "amanm3033@gmail.com",
//   subject: "Test mail",
//   text: "Node.js testing mail",
// };
// Email.sendEmail(mailDetails);

require("./config/db_config");

//Google signin start
var app = express();

app.use(cors());

app.get("/dashboard", (req, res) => {
  res.send({ Test: "Check" });
});

app.use(
  cookieSession({
    name: "google-auth-session",
    keys: ["key1", "key2"],
  })
);
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/roles", rolesRouter);
app.use("/countries", countryRouter);
app.use("/cities", cityRouter);
app.use("/states", stateRouter);
app.use("/schools", schoolRouter);
app.use("/classes", classRouter);
app.use("/subjects", subjectRouter);
app.use("/periods", periodRouter);
app.use("/classesStudents", classStudentRouter);
app.use("/attendances", attendanceRouter);
app.use("/google", googleRouter);
app.use("/leaves", leaveRouter);

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
