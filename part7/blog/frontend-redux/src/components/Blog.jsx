import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useField } from '../hooks';
import { commentBlog, deleteBlog, initializeBlogs, likeBlog } from '../reducers/blogs';
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';

const Blog = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  const id = useParams().id;
  const blog = useSelector(({ blogs }) => blogs.find((blog) => blog.id === id));
  const comment = useField('text');

  if (!blog) {
    return null;
  }

  const addComment = (event) => {
    event.preventDefault();
    dispatch(commentBlog(blog, comment.value, comment.reset));
  };

  const likeBlogFor = () => {
    dispatch(likeBlog(blog));
  };

  const removeBlog = () => {
    if (window.confirm(`Are you sure you want to delete '${blog.title}' by ${blog.author}?`)) {
      dispatch(deleteBlog(blog));
      navigate('/');
    }
  };

  return (
    <div>
      <h3 className='my-4'>{blog.title}</h3>
      <div className='my-2'>
        <a href={blog.url} target='blank'>
          {blog.url}
        </a>
      </div>
      <div className='my-2'>
        <div>
          {' '}
          {blog.likes} {blog.likes === 1 ? 'like' : 'likes'}
        </div>
        <Button className='ml-4' onClick={likeBlogFor}>
          like
        </Button>
      </div>
      <div className='my-2'>
        <Button variant='secondary' onClick={removeBlog}>
          remove
        </Button>
      </div>
      <div>added by {blog.user.name}</div>
      <div className='mt-5'>
        <h4>comments</h4>
        <form onSubmit={addComment}>
          <input {...comment.data} />
          <button type='submit'>add comment</button>
        </form>
        <div className='comments'>
          {blog.comments.map((comment) => (
            <li key={comment}>{comment}</li>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
