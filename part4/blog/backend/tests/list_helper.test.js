const listHelper = require('../utils/list_helper');
const helper = require('./helper');
const blogs = helper.blogs;
const listWithOneBlog = helper.listWithOneBlog;

describe('total likes', () => {
  const totalLikes = listHelper.totalLikes;

  test('when list is empty equals 0', () => {
    const result = totalLikes([]);
    expect(result).toBe(0);
  });

  test('when list has only one blog, equals the likes of that', () => {
    const result = totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test('when list has multiple blogs, equals total likes of all blogs', () => {
    const result = totalLikes(blogs);
    expect(result).toBe(36);
  });
});

describe('favourite blog', () => {
  const favoriteBlog = listHelper.favoriteBlog;

  test('when list is empty equals null', () => {
    const result = favoriteBlog([]);
    expect(result).toEqual(null);
  });

  test('when list has only one blog equals that blog', () => {
    const result = favoriteBlog(listWithOneBlog);
    expect(result).toEqual(listWithOneBlog[0]);
  });

  test('when list has multiple blogs, equals total likes of all blogs', () => {
    const result = favoriteBlog(blogs);
    expect(result).toEqual({
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0,
    });
  });
});

describe('most blogs', () => {
  const mostBlogs = listHelper.mostBlogs;

  test('when list is empty equals null', () => {
    const result = mostBlogs([]);
    expect(result).toEqual(null);
  });

  test('when list has only one blog equals that one author with one blog', () => {
    const result = mostBlogs(listWithOneBlog);
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', blogs: 1 });
  });

  test('when list has multiple blogs, equals author with most blogs and number of that author blogs', () => {
    const result = mostBlogs(blogs);
    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3,
    });
  });
});

describe('most likes', () => {
  const mostLikes = listHelper.mostLikes;

  test('when list is empty equals null', () => {
    const result = mostLikes([]);
    expect(result).toEqual(null);
  });

  test('when list has only one blog equals that one author with that one blog likes', () => {
    const result = mostLikes(listWithOneBlog);
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 5 });
  });

  test('when list has multiple blogs, equals author with most blogs and number of that author blogs', () => {
    const result = mostLikes(blogs);
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 });
  });
});
