const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;
require("dotenv").config(".env");

//-----MIDDLEWARE---------
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, "..", "client", "public")));

// create a poll
app.post("/api/poll", (req, res) => {
  res.send("hey");
});

app.get("/api/poll/:id", (req, res) => {
  const id = req.params.id;
  res.send(id);
});

app.listen(PORT, () => {
  console.log(`Server now listening on http://localhost:${PORT}`);
});
