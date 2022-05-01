const connectToMongo = require("./database");
const express = require("express");

// Connect to mongoDB
connectToMongo();

// Express Constants
const app = express();
const port = 3000;

// Middleware for using req.body
app.use(express.json());

// Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
