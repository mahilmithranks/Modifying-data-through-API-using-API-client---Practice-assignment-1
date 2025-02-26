const express = require("express");
const connectDB = require("./config/db");
const menuRoutes = require('./routes/menuRoutes');
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

connectDB();

app.use("/menu",menuRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is runing on port ${PORT}`);
});