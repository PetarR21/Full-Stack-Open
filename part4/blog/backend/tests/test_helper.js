const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'Blog1',
    author: 'Author1',
    url: 'Url1',
    likes: 1,
  },
  {
    title: 'Blog2',
    author: 'Author2',
    url: 'Url2',
    likes: 2,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({
    content: 'toberemoved',
    author: 'toberemoved',
    url: 'toberemoved',
    likes: 0,
  });

  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((b) => b.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
};
