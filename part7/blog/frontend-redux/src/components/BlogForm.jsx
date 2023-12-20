import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogs';
import { useField } from '../hooks';
import { useRef } from 'react';
import Togglable from './Togglable';

const BlogForm = () => {
  const title = useField('text');
  const author = useField('text');
  const url = useField('text');

  const dispatch = useDispatch();

  const clear = () => {
    title.reset();
    author.reset();
    url.reset();
  };

  const hide = () => {
    blogFormRef.current.toggleVisibility();
  };

  const addBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title: title.value,
      author: author.value,
      url: url.value,
    };
    dispatch(createBlog(blogObject, clear,hide));
  };

  const blogFormRef = useRef();

  return (
    <Togglable buttonLabel='add blog' ref={blogFormRef}>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        title:
        <input {...title.data} />
        <br />
        author:
        <input {...author.data} />
        <br />
        url:
        <input {...url.data} />
        <br />
        <button type='submit'>create</button>
      </form>
    </Togglable>
  );
};

export default BlogForm;
