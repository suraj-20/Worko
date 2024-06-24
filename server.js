require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/monogDB");
const userRoutes = require("./routes/userRoutes");

const PORT = process.env.PORT || 8000;

const app = express();
app.use(bodyParser.json());
app.use("/api", userRoutes);

app.get("/", (req, res) => {
  return res.send("Hey, Are you there.!");
});

app.listen(PORT, () => {
  connectDB(process.env.MONGO_URI);
  console.log(`Server is listening on port: ${PORT}`);
});

module.exports = app;
