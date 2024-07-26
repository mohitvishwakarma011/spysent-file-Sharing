require("dotenv").config();
const express = require("express");
const passport = require("passport");
const session = require("express-session");
require("./config/passport")(passport);

const flash = require("connect-flash");

const app = express();
const path = require("path");
const cors = require("cors");

const PORT = process.env.PORT || 3000;
//From here the express pipeline starts
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//requiring the database
const connectDB = require("./config/db");
connectDB();

//CORS
const corsoption = {
  origin: process.env.ALLOWED_CLIENTS.split(","),
};
app.use(cors(corsoption));

//Implementing session

app.use(
  session({
    secret: "your_secret_key_here",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true },
  })
);

app.use(passport.initialize());
app.use(passport.session());

//flash
app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

//Template engine
app.set("view engine", "ejs");

// Routes
app.use("/", require("./routes/home"));
app.use("/users", require("./routes/users"));
app.use("/api/files", require("./routes/files"));
app.use("/files", require("./routes/show"));
app.use("/files/download", require("./routes/download"));
app.use("/aloginhome", require("./routes/aloginhome"));
app.use("/logout", require("./routes/logout"));
app.use("/sendfile", require("./routes/sendfile"));
app.use("/history", require("./routes/history"));
app.use("/forgot-password", require("./routes/forgot-password"));

app.listen(PORT, () => {
  console.log(`server is listenong on the port - ${PORT}`);
});
