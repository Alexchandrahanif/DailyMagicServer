require("dotenv").config();

const router = require("./routes");
const handleError = require("./middleware/handleError");

const cors = require("cors");
const express = require("express");

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", router);
app.use("/upload", express.static("upload"));
app.use(handleError);

app.listen(port, () => {
  console.log(`PRINTHINK SERVER CONNECTED!`);
});
