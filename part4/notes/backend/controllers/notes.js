const notesRouter = require('express').Router();
const Note = require('../models/note');

notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({});

  response.json(notes);
});

notesRouter.get('/:id', async (request, response) => {
  const id = request.params.id;

  const note = await Note.findById(id);
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

notesRouter.post('/', async (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing',
    });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  const savedNote = await note.save();
  response.status(201).json(savedNote);
});

notesRouter.delete('/:id', async (request, response) => {
  const id = request.params.id;

  const noteToDelete = await Note.findById(id);

  if (noteToDelete) {
    await noteToDelete.remove();
    response.status(204).end();
  } else {
    response.status(404).end();
  }
});

notesRouter.put('/:id', async (request, response) => {
  const body = request.body;

  const note = {
    content: body.content,
    important: body.important,
  };

  const updatedNote = await Note.findByIdAndUpdate(request.params.id, note, {
    new: true,
    runValidators: true,
    context: 'query',
  });
  response.json(updatedNote);
});

module.exports = notesRouter;
