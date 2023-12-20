import { useState, useEffect, useRef } from 'react';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import BlogList from './components/BlogList';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const loginFormRef = useRef();

  const handleLogin = (credentials) => {
    loginService
      .login(credentials)
      .then((user) => {
        window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
        blogService.setToken(user.token);
        setUser(user);
        loginFormRef.current.setUsername('');
        loginFormRef.current.setPassword('');
      })
      .catch((error) => {
        showNotification('wrong username or password', 'error');
      });
  };

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <Notification />
      <LoginForm onLogin={handleLogin} ref={loginFormRef} />
    </div>
  );

  const removeBlog = (blog) => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      blogService
        .remove(blog.id)
        .then(() => {
          setBlogs(blogs.filter((b) => b.id !== blog.id));
          showNotification(`Successfully removed blog ${blog.title} by ${blog.author}`, 'success');
        })
        .catch((error) => {
          showNotification(error.response.data.error, 'error');
        });
    }
  };

  return (
    <div>
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <h2>blogs</h2>
          <Notification />
          <p>
            {user.name} logged in{' '}
            <button
              onClick={() => {
                setUser(null);
                window.localStorage.clear();
              }}
            >
              log out
            </button>
          </p>
          {<BlogForm />} {<BlogList />}
        </div>
      )}
    </div>
  );
};

export default App;
