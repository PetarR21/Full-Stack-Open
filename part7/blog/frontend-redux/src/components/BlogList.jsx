import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initializeBlogs } from '../reducers/blogs';
import Blog from './Blog';

const BlogList = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(({ blogs }) => [...blogs].sort((a, b) => b.likes - a.likes));

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
