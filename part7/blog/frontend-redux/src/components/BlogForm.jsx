import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogs';
import { useField } from '../hooks';
import { useRef } from 'react';
import Togglable from './Togglable';
import { Table, Form, Button, FormControl } from 'react-bootstrap';

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
    dispatch(createBlog(blogObject, clear, hide));
  };

  const blogFormRef = useRef();

  return (
    <div className='w-50'>
      <Togglable buttonLabel='add blog' ref={blogFormRef}>
        <h2 className='my-4'>create new blog</h2>
        <Form onSubmit={addBlog}>
          <Form.Group>
            <Form.Label>title</Form.Label>
            <Form.Control {...title.data} />
          </Form.Group>
          <Form.Group>
            <Form.Label>author</Form.Label>
            <Form.Control {...author.data} />
          </Form.Group>
          <Form.Group>
            <Form.Label>url</Form.Label>
            <Form.Control {...url.data} />
          </Form.Group>
          <Button className='my-4' variant='primary' type='submit'>
            create
          </Button>
        </Form>
      </Togglable>
    </div>
  );
};

export default BlogForm;
