import { useState } from 'react';

const Blog = ({ user, blog, likeBlog, removeBlog }) => {
  const [showDetails, setShowDetails] = useState(false);

  const showWhenVisible = { display: showDetails ? '' : 'none' };
  console.log(blog);
  return (
    <div className='blog'>
      <div>
        {blog.title} {blog.author}{' '}
        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? 'hide' : 'view'}
        </button>
      </div>
      <div style={showWhenVisible} className='blogDetails'>
        <div>{blog.url}</div>
        <div>
          {blog.likes !== 1 ? 'likes' : 'like'} {blog.likes}{' '}
          <button
            className='likeBtn'
            onClick={() => {
              likeBlog(blog);
            }}
          >
            like
          </button>
        </div>
        <div>{blog.user.name}</div>
        {user.username === blog.user.username ? (
          <button
            onClick={() => {
              removeBlog(blog);
            }}
          >
            remove
          </button>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default Blog;
