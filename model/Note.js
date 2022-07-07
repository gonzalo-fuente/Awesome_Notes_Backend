const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  editedAt: {
    type: Date,
    required: true,
  },
  archived: {
    type: Boolean,
    required: true,
  },
  categories: {
    type: Array,
  },
  color: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Note", noteSchema);
