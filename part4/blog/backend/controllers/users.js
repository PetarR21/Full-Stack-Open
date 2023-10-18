const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

usersRouter.get('/', async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  if (!password) {
    return response.status(400).json({ error: 'password is required' });
  } else if (password.length < 3) {
    return response.status(400).json({ error: 'invalid password' });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();
  response.status(201).json(savedUser);
});

module.exports = usersRouter;
