const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
    minlength: [3, "Name must be at least 3 characters long"],
    maxlength: [15, "Name must be smaller than 15 characters length"],
  },
  title: {
    type: String,
    required: true,
    minlength: [2, "Title must be at least 2 characters long"],
    maxlength: [30, "Name must be smaller than 30 characters length"],
  },
  content: {
    type: String,
    minlength: [10, "Blog should have at least 10 characters"],
    maxlength: [1500, "Blog should have ne smaller than 1500 characters"],
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Blogs", schema);
