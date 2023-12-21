import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useField } from '../hooks';
import { commentBlog, initializeBlogs } from '../reducers/blogs';
import { useEffect } from 'react';

const Blog = () => {
  const dispatch = useDispatch();

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

  return (
    <div>
      <h3>{blog.title}</h3>
      <div>
        <a href={blog.url} target='blank'>
          {blog.url}
        </a>
      </div>
      <div>
        {blog.likes} {blog.likes === 1 ? 'like' : 'likes'}
      </div>
      <div>added by {blog.user.name}</div>
      <div>
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
