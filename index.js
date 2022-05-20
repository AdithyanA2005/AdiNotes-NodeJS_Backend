const express = require("express");
const cors = require("cors");
const connectToMongo = require("./database");
const { PORT } = require("./utilities/constants");
const display = require("./utilities/display");

// Connect to mongoDB
connectToMongo();

// Express Constants
const app = express();
const port = PORT;

// Middleware
app.use(cors());
app.use(express.json());

// Available Routes
app.use("/api/v1/auth", require("./routes/auth"));
app.use("/api/v1/notes", require("./routes/notes"));

app.listen(port, () => {
  display(`Server started at port ${port}`);
});
