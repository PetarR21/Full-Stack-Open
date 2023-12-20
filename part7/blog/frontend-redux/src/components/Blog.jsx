import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBlog, likeBlog } from '../reducers/blogs';

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [view, setView] = useState(false);

  const toggleView = () => {
    setView(!view);
  };

  const showWhenView = { display: view ? '' : 'none' };

  const removeBlog = () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog));
    }
  };

  const likeBlogFor = () => {
    dispatch(likeBlog(blog));
  };

  return (
    <div className='blog'>
      {blog.title} {blog.author} <button onClick={toggleView}>{view ? 'hide' : 'view'}</button>
      <div style={showWhenView}>
        <div>{blog.url}</div>
        <div>
          {blog.likes === 1 ? 'like' : 'likes'} {blog.likes}{' '}
          <button onClick={likeBlogFor}>like</button>
        </div>
        <div>{blog.user.name}</div>
        <button onClick={removeBlog}>remove</button>
      </div>
    </div>
  );
};

export default Blog;
