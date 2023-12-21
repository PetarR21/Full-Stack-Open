import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initializeBlogs } from '../reducers/blogs';
import { Link } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';

const BlogList = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(({ blogs }) => [...blogs].sort((a, b) => b.likes - a.likes));

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  return (
    <ListGroup className='mt-5'>
      {blogs.map((blog) => (
        <ListGroup.Item key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default BlogList;
