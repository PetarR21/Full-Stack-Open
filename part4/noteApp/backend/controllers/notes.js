const notesRouter = require('express').Router();
const Note = require('../models/note');

notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({});
  response.json(notes);
});

notesRouter.get('/:id', async (request, response) => {
  const note = await Note.findById(request.params.id);
  if (note) {
    response.json(note);
  } else {
    response.sendStatus(404);
  }
});

notesRouter.post('/', async (request, response) => {
  const body = request.body;

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  const savedNote = await note.save();
  response.status(201).json(savedNote);
});

notesRouter.delete('/:id', async (request, response) => {
  const note = await Note.findByIdAndRemove(request.params.id);
  if (note) {
    response.sendStatus(204);
  } else {
    response.sendStatus(404);
  }
});

notesRouter.put('/:id', async (request, response) => {
  const body = request.body;

  const note = {
    content: body.content,
    important: body.important || false,
  };

  const updatedNote = Note.findByIdAndUpdate(request.params.id, note, { new: true });
  if (updatedNote) {
    response.json(updatedNote);
  } else {
    response.sendStatus(404);
  }
});

module.exports = notesRouter;
