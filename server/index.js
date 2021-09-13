const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;
require("dotenv").config(".env");

//-----MIDDLEWARE---------
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.listen(PORT, () => {
  console.log(`Server now listening on http://localhost:${PORT}`);
});
