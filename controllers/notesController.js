const Note = require("../model/Note");

const getAllNotes = async (req, res) => {
  const notes = await Note.find();
  if (!notes) return res.status(204).json({ "message": "No notes found." });
  res.json(notes);
};

const createNewNote = async (req, res) => {
  if (!req?.body?.title || !req?.body?.editedAt || !req?.body?.color) {
    return res
      .status(400)
      .json({ "message": "Title, editedAt and color are required" });
  }

  try {
    const result = await Note.create({
      title: req.body.title,
      content: req.body.content,
      editedAt: req.body.editedAt,
      archived: req.body.archived,
      categories: req.body.categories,
      color: req.body.color,
    });

    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};

const updateNote = async (req, res) => {
  if (!req?.body?._id) {
    return res.status(400).json({ "message": "ID parameter is required." });
  }

  const note = await Note.findOne({ _id: req.body._id }).exec();
  if (!note) {
    return res
      .status(204)
      .json({ "message": `No note matches ID ${req.body._id}.` });
  }
  note.title = req.body.title;
  note.content = req.body.content;
  note.editedAt = req.body.editedAt;
  note.archived = req.body.archived;
  note.categories = req.body.categories;
  note.color = req.body.color;
  const result = await note.save();
  res.json(result);
};

const deleteNote = async (req, res) => {
  if (!req?.body?._id)
    return res.status(400).json({ "message": "Note ID required." });

  const note = await Note.findOne({ _id: req.body._id }).exec();
  if (!note) {
    return res
      .status(204)
      .json({ "message": `No note matches ID ${req.body._id}.` });
  }
  const result = await note.deleteOne(); //{ _id: req.body.id }
  res.json(result);
};

const getNote = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ "message": "Note ID required." });

  const note = await Note.findOne({ _id: req.params.id }).exec();
  if (!note) {
    return res
      .status(204)
      .json({ "message": `No note matches ID ${req.params.id}.` });
  }
  res.json(note);
};

module.exports = {
  getAllNotes,
  createNewNote,
  updateNote,
  deleteNote,
  getNote,
};
