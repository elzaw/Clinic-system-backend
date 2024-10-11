const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
const dotenv = require("dotenv");
dotenv.config();

const doctorsRoutes = require("./routes/doctorsRoutes");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(
    `Clinic system app listening in ${process.env.NODE_ENV} on port ${port}!`
  );
});
