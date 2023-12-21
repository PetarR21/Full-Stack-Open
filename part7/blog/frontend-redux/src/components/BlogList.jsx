import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initializeBlogs } from '../reducers/blogs';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(({ blogs }) => [...blogs].sort((a, b) => b.likes - a.likes));

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  return (
    <div>
      {blogs.map((blog) => (
        <div className='blog' key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
