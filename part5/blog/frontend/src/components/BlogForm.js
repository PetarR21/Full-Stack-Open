import { useState } from 'react';

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const createBlog = (event) => {
    event.preventDefault();

    addBlog({ title, author, url });
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div className='formDiv'>
      <h2>create new</h2>
      <form onSubmit={createBlog}>
        <div>
          title:
          <input
            type='text'
            value={title}
            name='Title'
            placeholder='title of the blog'
            onChange={({ target }) => {
              setTitle(target.value);
            }}
          />
        </div>
        <div>
          author:
          <input
            type='text'
            value={author}
            name='Author'
            placeholder='author of the blog'
            onChange={({ target }) => {
              setAuthor(target.value);
            }}
          />
        </div>
        <div>
          url:
          <input
            type='text'
            value={url}
            name='Url'
            placeholder='url of the blog'
            onChange={({ target }) => {
              setUrl(target.value);
            }}
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  );
};

export default BlogForm;
