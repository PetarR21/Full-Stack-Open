const jwt = require('jsonwebtoken');
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

const { userExtractor } = require('../utils/middleware');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  if (blog) {
    response.json(blog);
  } else {
    response.sendStatus(404);
  }
});

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body;

  const user = request.user;

  if (!user) {
    return response.status(401).json({ error: 'opertion not permitted' });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  });

  savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog);
  await user.save();
  response.status(201).json(await savedBlog.populate('user', { username: 1, name: 1 }));
});

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user;

  const blogToDelete = await Blog.findById(request.params.id);
  if (!blogToDelete) {
    return response.sendStatus(404);
  }

  if (!user) {
    response.status(401).json({ error: 'invalid token' });
  }

  if (user.id.toString() !== blogToDelete.user.toString()) {
    return response.status(401).json({ error: 'operation not permitted' });
  }

  await Blog.findByIdAndRemove(request.params.id);

  response.sendStatus(204);
});

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });

  if (updatedBlog) {
    response.json(await updatedBlog.populate('user', { username: 1, name: 1 }));
  } else {
    response.sendStatus(404);
  }
});

module.exports = blogsRouter;
