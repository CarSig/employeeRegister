require("dotenv").config({ path: "C:/Users/Lovro/Documents/Projects/employeeRegister/.env" });
// import npm packages

const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const app = express();
const routes = require("./routes/api");

const PORT = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI;

//connection to database
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    app.listen(PORT, () => {
      console.log(`Server starting on ${PORT}`);
    })
  )
  .then(
    mongoose.connection.on("connected", () => {
      console.log("Mongoose is connected!");
    })
  )
  .catch((error) => console.log(error.message));

// Data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// HTTP request logger
app.use(morgan("tiny"));

//routing
app.use("/api", routes);
