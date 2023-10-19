import Blog from './Blog';

const Blogs = ({ blogs, likeBlog, removeBlog }) => {
  return (
    <div>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} likeBlog={likeBlog} removeBlog={removeBlog} />
        ))}
    </div>
  );
};

export default Blogs;
