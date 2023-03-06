const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});

  response.json(blogs);
});

blogsRouter.get('/:id', async (request, response) => {
  const id = request.params.id;

  const blog = await Blog.findById(id);

  if (blog) {
    return response.json(blog);
  } else {
    return response.sendStatus(404);
  }
});

blogsRouter.post('/', async (request, response) => {
  const body = request.body;

  if (!body.title) {
    return response.status(400).send({ error: 'title missing' });
  }

  if (!body.url) {
    return response.status(400).send({ error: 'url missing' });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  });

  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id;
  const blogToDelete = await Blog.findById(id);

  if (blogToDelete) {
    await Blog.findByIdAndRemove(id);
    return response.sendStatus(204);
  } else {
    return response.sendStatus(404);
  }
});

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id;
  const { likes } = request.body;

  const blogToUpdate = await Blog.findById(id);

  if (blogToUpdate) {
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { likes },
      {
        new: true,
        runValidators: true,
      }
    );
    response.json(updatedBlog);
  } else {
    return response.sendStatus(404);
  }
});

module.exports = blogsRouter;
