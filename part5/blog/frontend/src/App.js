import { useEffect, useState } from 'react';

import Blogs from './components/Blogs';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';

import blogService from './services/blog';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      if (blogs) {
        setBlogs(blogs);
      } else {
        setBlogs([]);
      }
    });
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (error) {
      showNotification({
        type: 'error',
        message: `invalid username or password`,
      });
    }
  };

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <Notification notification={notification} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => {
              setUsername(target.value);
            }}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => {
              setPassword(target.value);
            }}
          />
        </div>
        <button type='submit'>log in</button>
      </form>
    </div>
  );

  const logout = () => {
    window.localStorage.removeItem('loggedBlogUser');
    window.location.reload(false);
  };

  const showNotification = (notification) => {
    setNotification(notification);
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const addBlog = async (event) => {
    event.preventDefault();

    const newBlog = await blogService.create({ title, author, url });
    setBlogs(blogs.concat(newBlog));
    setTitle('');
    setAuthor('');
    setUrl('');
    showNotification({
      type: 'success',
      message: `a new blog ${newBlog.title} by ${newBlog.author} added`,
    });
  };

  const homePage = () => (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      <p>
        {user.name} logged in <button onClick={logout}>logout</button>
      </p>
      <BlogForm
        addBlog={addBlog}
        title={title}
        setTitle={setTitle}
        author={author}
        setAuthor={setAuthor}
        url={url}
        setUrl={setUrl}
      />
      <Blogs blogs={blogs} />
    </div>
  );

  return <div>{user ? homePage() : loginForm()}</div>;
};

export default App;
