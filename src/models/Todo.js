import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  username: {
    type: String,
    required: false,
    default: "ChiaraJF",
  },
  avatar: {
    type: String,
    required: false,
    default: "https://robohash.org/Chiara?set=set4",
  },
  todo_title: {
    type: String,
    required: false,
    default: "Title not found",
  },
  todo_content: {
    type: String,
    required: false,
    default: "content not found",
  },
  todo_date: {
    type: Date,
    required: false,
  },
  todo_time: {
    type: Date,
    required: false,
  },
  categories: {
    type: String,
    required: false,
  },
  isInProgress: {
    type: Boolean,
    default: true,
    reuired: false,
  },
});

module.exports = mongoose.models.Todo || mongoose.model("Todo", todoSchema);
