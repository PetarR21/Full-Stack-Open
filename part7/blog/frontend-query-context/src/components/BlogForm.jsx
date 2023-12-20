import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import { useField } from '../hooks';
import blogService from '../services/blog';
import Togglable from './Togglable';
import { useNotify } from '../contexts/NotificationContext';

const BlogForm = () => {
  const queryClient = useQueryClient();

  const notify = useNotify();

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (res) => {
      notify(`a new blog ${res.title} by ${res.author} added`, 'success');
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      clear();
    },
    onError: (error) => {
      notify(error.response.data.error, 'error');
    },
  });

  const title = useField('text');
  const author = useField('text');
  const url = useField('text');

  const handleSubmit = (event) => {
    event.preventDefault();
    newBlogMutation.mutate({
      title: title.value,
      author: author.value,
      url: url.value,
    });
  };

  const clear = () => {
    title.reset();
    author.reset();
    url.reset();
  };

  const blogFormRef = useRef();

  return (
    <div>
      <h2>create new blog</h2>
      <Togglable buttonLabel='add blog' ref={blogFormRef}>
        <form onSubmit={handleSubmit}>
          <div>
            title
            <input {...title.data} />
          </div>
          <div>
            author
            <input {...author.data} />
          </div>
          <div>
            url
            <input {...url.data} />
          </div>
          <button type='submit'>create</button>
        </form>
      </Togglable>
    </div>
  );
};

export default BlogForm;
