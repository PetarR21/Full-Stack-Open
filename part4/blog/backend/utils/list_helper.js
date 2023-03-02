const _ = require('lodash');

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.length === 0 ? null : _.maxBy(blogs, 'likes');
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const object = _.mapValues(_.groupBy(blogs, 'author'), (value, key, object) => {
    return value.length;
  });

  const array = _.map(object, (value, key, object) => {
    return {
      author: key,
      blogs: value,
    };
  });

  return _.maxBy(array, 'blogs');
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const object = _.mapValues(_.groupBy(blogs, 'author'), (value, key, object) => {
    return value.reduce((sum, obj) => sum + obj.likes, 0);
  });

  const array = _.map(object, (value, key, object) => {
    return {
      author: key,
      likes: value,
    };
  });

  return _.maxBy(array, 'likes');
};

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
