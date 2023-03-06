const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'Blog 1',
    author: 'Author 1',
    url: 'https://test.com/blog1',
    likes: 15,
  },
  {
    title: 'Blog 2',
    author: 'Author 2',
    url: 'https://test.com/blog2',
    likes: 30,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'willremovethissoon',
    author: 'willremovethissoon',
    url: 'willremovethissoon',
    likes: 0,
  });

  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
};
