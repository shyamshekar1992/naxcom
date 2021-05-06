const express = require("express");
const cors = require("cors");
require("dotenv").config();


const app = express();
const port = process.env.PORT || 3000;

// app.use(upload())
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + '/storage'));


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

require("./routes/image")(app);
