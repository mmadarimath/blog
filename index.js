const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const userRoute = require("./routes/user");

const app = express();
const PORT = 5000;

mongoose.connect("mongodb://localhost:27017/blogged")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", (req, res) => res.render("home"));

app.use("/user", userRoute);

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
