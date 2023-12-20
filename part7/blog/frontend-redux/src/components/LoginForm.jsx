import { useDispatch } from 'react-redux';
import { useField } from '../hooks';
import { setNotification } from '../reducers/notification';
import { setUser } from '../reducers/user';
import loginService from '../services/login';
import blogsService from '../services/blogs';
import Notification from './Notification';

const LoginForm = () => {
  const username = useField('text');
  const password = useField('password');

  const dispatch = useDispatch();

  const clear = () => {
    username.reset();
    password.reset();
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username: username.value, password: password.value });
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
      blogsService.setToken(user.token);
      dispatch(setUser(user));
      clear();
    } catch (error) {
      console.log(error);
      dispatch(setNotification({ message: 'wrong username or password', type: 'error' }, 5));
    }
  };

  return (
    <div>
      <h2>log in to application</h2>
      <Notification />
      <form onSubmit={handleLogin}>
        <div>
          username <input {...username.data} />
        </div>
        <div>
          password <input {...password.data} />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  );
};

export default LoginForm;
