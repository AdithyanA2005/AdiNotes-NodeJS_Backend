const express = require("express");
const connectToMongo = require("./database/config");
const { PORT } = require("./utilities/constants");
const display = require("./utilities/display");

// Connect to mongoDB
connectToMongo();

// Express Constants
const app = express();
const port = PORT;

// Middleware for using req.body
app.use(express.json());

// Available Routes
app.use("/api/v1/auth", require("./routes/auth"));
app.use("/api/v1/notes", require("./routes/notes"));

app.listen(port, () => {
  display(`Server started at port ${port}`);
});
