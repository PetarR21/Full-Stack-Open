import { useNotify } from '../contexts/NotificationContext';
import { useLogin } from '../contexts/UserContext';
import { useField } from '../hooks';
import Notification from './Notification';

const LoginForm = () => {
  const login = useLogin();

  const notify = useNotify();

  const username = useField('text');
  const password = useField('password');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ username: username.value, password: password.value });
    } catch (error) {
      notify('invalid username or password', 'error');
    }
  };

  return (
    <div>
      <h2>log in to application</h2>
      <Notification />
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input {...username.data} />
        </div>
        <div>
          password
          <input {...password.data} />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  );
};

export default LoginForm;
