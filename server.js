require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

const PORT = process.env.PORT || 3000;
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended:false}));



//requiring the database
const connectDB = require("./config/db");
connectDB();

//CORS
const corsoption = {
  origin: process.env.ALLOWED_CLIENTS.split(","),
};
app.use(cors(corsoption));

//Template engine
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

// Routes
// app.use("/", require("./routes/home"));
app.use("/api/files", require("./routes/files"));
app.use("/files", require("./routes/show"));
app.use("/files/download", require("./routes/download"));
app.use("/", require("./routes/home"));
app.use("/signup", require("./routes/signup"));
app.use("/gohome", require("./routes/gohome"));

app.listen(PORT, () => {
  console.log(`server is listenong on the port - ${PORT}`);
});
