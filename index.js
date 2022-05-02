const connectToMongo = require("./database/config");
const express = require("express");
const display = require("./utilities/display");

// Connect to mongoDB
connectToMongo();

// Express Constants
const app = express();
const port = 5000;

// Middleware for using req.body
app.use(express.json());

// Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(` ${port}`);
  display(`Server started at port ${port}`);
});
