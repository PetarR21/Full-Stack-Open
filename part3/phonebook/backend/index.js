const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
require('dotenv').config();
const Person = require('./models/person');

app.use(express.static('build'));
app.use(cors());
app.use(express.json());

// eslint-disable-next-line no-unused-vars
morgan.token('body', function (req, res) {
  return JSON.stringify(req.body);
});

const requestLogger = morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'),
    '-',
    tokens['response-time'](req, res),
    'ms',
    tokens.body(req, res),
  ].join(' ');
});

app.use(requestLogger);

app.get('/', (request, response) => {
  response.send('<h1>Phonebook API</h1>');
});

app.get('/info', async (request, response) => {
  const count = await Person.collection.count();

  response.send(
    `<p>Phonebook has info for ${count} ${count === 1 ? 'person' : 'people'}</p>
    <p>${new Date()}}</p>
    `
  );
});

app.get('/api/persons/', async (request, response) => {
  const persons = await Person.find({});
  response.json(persons);
});

app.get('/api/persons/:id', async (request, response, next) => {
  const id = request.params.id;

  try {
    const person = await Person.findById(id);

    if (person) {
      response.json(person);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

app.post('/api/persons/', async (request, response, next) => {
  const { name, number } = request.body;

  const person = new Person({
    name,
    number,
  });

  try {
    const savedPerson = await person.save();
    response.json(savedPerson);
  } catch (error) {
    next(error);
  }
});

app.delete('/api/persons/:id', async (request, response, next) => {
  const id = request.params.id;

  try {
    const personToDelete = Person.findById(id);

    if (personToDelete) {
      await personToDelete.remove();
      response.status(204).end();
    } else {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

app.put('/api/persons/:id', async (request, response, next) => {
  const id = request.params.id;
  const { number } = request.body;

  try {
    const personToUpdate = await Person.findById(id);
    console.log(personToUpdate);
    if (personToUpdate) {
      const updatedPerson = await Person.findByIdAndUpdate(
        id,
        { number },
        { new: true, runValidators: true, context: 'query' }
      );
      response.json(updatedPerson);
    } else {
      return response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

const unknownEndpoit = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoit);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    response.status(400).send({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log('Server running on port', PORT);
});
