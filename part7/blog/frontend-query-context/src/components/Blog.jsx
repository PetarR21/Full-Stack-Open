/* eslint-disable react/prop-types */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import blogService from '../services/blog';
import { useNotify } from '../contexts/NotificationContext';

const Blog = ({ blog }) => {
  const queryClient = useQueryClient();
  const notify = useNotify();

  const removeBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      notify(`blog '${blog.title}' by '${blog.author}' removed`, 'success');
    },
    onError: (error) => {
      notify(error.response.data.error, 'error');
    },
  });

  const likeBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      notify(`blog '${blog.title}' by '${blog.author}' liked`, 'success');
    },
    onError: (error) => {
      notify(error.response.data.error, 'error');
    },
  });

  const [view, setView] = useState(false);

  const toggleView = () => {
    setView(!view);
  };

  const showWhenView = { display: view ? '' : 'none' };

  const removeBlog = () => {
    removeBlogMutation.mutate(blog.id);
  };

  const likeBlogFor = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    likeBlogMutation.mutate(updatedBlog);
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
