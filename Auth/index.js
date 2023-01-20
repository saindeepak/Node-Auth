const express = require("express");
const blogRoutes = require("./routes/blogs");
const authRoutes = require("./routes/userAuth");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.STRING_CONNECTION, { useNewUrlParser: true })
  .then(() => {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use("/blogs", blogRoutes);
    app.use("/auth", authRoutes);
    app.listen(8080, () => {
      console.log(`Server has started`);
    });
  });
