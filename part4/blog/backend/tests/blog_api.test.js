const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const helper = require('./test_helper');
const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
}, 100000);

test('returns the correct amount of blog posts in the JSON format', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body[0].id).toBeDefined();
  expect(response.body[0]._id).not.toBeDefined();
});

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'test',
    author: 'test',
    url: 'test',
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const blogs = blogsAtEnd.map((b) => {
    return { title: b.title, likes: b.likes };
  });
  expect(blogs).toContainEqual({ title: 'test', likes: 0 });
});

test('if the title or url are missing returns 400', async () => {
  const newBlog1 = {
    title: 'test',
    author: 'test',
  };

  const newBlog2 = {
    author: 'test',
    url: 'test',
  };

  await api.post('/api/blogs').send(newBlog1).expect(400);

  await api.post('/api/blogs').send(newBlog2).expect(400);
});

test('deletition of a blog returns status 204 if id is valid', async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToDelete = blogsAtStart[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

  const titles = blogsAtEnd.map((b) => b.title);
  expect(titles).not.toContain(blogToDelete.title);
});

test('updating of a blog returns status 200 if id is valid', async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToUpdate = blogsAtStart[0];

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send({ ...blogToUpdate, likes: blogToUpdate.likes + 1 })
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);

  const blogs = blogsAtEnd.map((b) => {
    return { title: b.title, likes: b.likes };
  });
  expect(blogs).toContainEqual({ title: blogToUpdate.title, likes: blogToUpdate.likes + 1 });
});

afterAll(async () => {
  await mongoose.connection.close();
});
