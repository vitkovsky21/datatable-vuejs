const express = require("express");
const cors = require("cors");
const path = require('path');

const app = express();

var corsOptions = {
  origin: "https://docker-datatbl.herokuapp.com/api/datatables"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome" });
});

require("./app/routes/data.routes.js")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});