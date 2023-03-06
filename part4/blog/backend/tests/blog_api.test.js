const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const api = supertest(app);
const helper = require('./test_helper');

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe('getting blogs', () => {
  test('all blogs are returned', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs');

    const titles = response.body.map((blog) => blog.title);
    expect(titles).toContain(helper.initialBlogs[0].title);
  });

  test('unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body[0].id).toBeDefined();
  });

  test('getting individual note with valid id succeeds', async () => {
    const blogs = await helper.blogsInDb();
    const blog = blogs[0];

    const response = await api
      .get(`/api/blogs/${blog.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const resultBlog = response.body;
    expect(resultBlog).toEqual(blog);
  });

  test('getting missing note returns status 404', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blog = blogsAtStart[0];

    await Blog.findByIdAndRemove(blog.id);

    await api.get(`/api/blogs/${blog.id}`).expect(404);
  });

  test('getting note with malformatted id return status 400', async () => {
    await api.get(`/api/blogs/1`).expect(400);
  });
});

describe('adding new blog', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Blog 3',
      author: 'Author 3',
      url: 'https://test.com/blog3',
      likes: 10,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map((blog) => blog.title);
    expect(titles).toContain(newBlog.title);
  });

  test('if the likes property is missing from the request, it will default to the value 0', async () => {
    const newBlog = {
      title: 'Blog 3',
      author: 'Author 3',
      url: 'https://test.com/blog3',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const addedBlogLikes = blogsAtEnd.find((blog) => blog.title === newBlog.title).likes;
    expect(addedBlogLikes).toBe(0);
  });

  test('adding blog fails with status code 400 if the title or url properties are missing', async () => {
    let newBlog = {
      author: 'Author 3',
      url: 'https://test.com/blog3',
    };

    await api.post('/api/blogs').send(newBlog).expect(400);

    newBlog = {
      title: 'Blog 3',
      author: 'Author 3',
    };

    await api.post('/api/blogs').send(newBlog).expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});

describe('deleting blog', () => {
  test('deleting individual blog with valid id succeeds with status code 204', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);
  });

  test('deleting missing blog fails with status code 404', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await Blog.findByIdAndRemove(blogToDelete.id);

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(404);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);
  });

  test('deleting blog with malformated id fails with status code 400', async () => {
    await api.delete(`/api/blogs/1`).expect(400);
  });
});

describe('updating blog', () => {
  test('updating individual blog with valid id succeeds with status code 200', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];
    const updatedLikes = blogToUpdate.likes + 1;

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: updatedLikes })
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);

    const blogs = blogsAtEnd.map((blog) => {
      return { title: blog.title, likes: blog.likes };
    });

    expect(blogs).toContainEqual({
      title: blogToUpdate.title,
      likes: updatedLikes,
    });
  });

  test('updating missing blog fails with status code 404', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    await Blog.findByIdAndRemove(blogToUpdate.id);

    await api.put(`/api/blogs/${blogToUpdate.id}`).send({ likes: 0 }).expect(404);
  });

  test('updating blog with malformated id fails with status code 400', async () => {
    await api.put(`/api/blogs/1`).send({ likes: 0 }).expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
