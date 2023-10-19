import { useState } from 'react';

const Blog = ({ blog, likeBlog, removeBlog }) => {
  const [showDetails, setShowDetails] = useState(false);

  const showWhenVisible = { display: showDetails ? '' : 'none' };

  return (
    <div className='blog'>
      <div>
        {blog.title} {blog.author}{' '}
        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? 'hide' : 'view'}
        </button>
      </div>
      <div style={showWhenVisible}>
        <div> {blog.url}</div>
        <div>
          {blog.likes !== 1 ? 'likes' : 'like'} {blog.likes}{' '}
          <button
            onClick={() => {
              likeBlog(blog);
            }}
          >
            like
          </button>
        </div>
        <div>{blog.user.name}</div>
        <button
          onClick={() => {
            removeBlog(blog);
          }}
        >
          remove
        </button>
      </div>
    </div>
  );
};

export default Blog;
