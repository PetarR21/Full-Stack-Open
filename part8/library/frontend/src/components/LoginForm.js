import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { LOGIN } from '../queries';

const LoginForm = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [login, result] = useMutation(LOGIN, {
    onCompleted: () => {
      setUsername('');
      setPassword('');
      props.setPage('authors');
    },
    onError: (error) => {
      props.notify(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      props.setToken(token);
      localStorage.setItem('library-user-token', token);
    }
  }, [result.data]);

  if (!props.show) {
    return null;
  }

  const submit = (event) => {
    event.preventDefault();

    login({ variables: { username, password } });
  };

  return (
    <form onSubmit={submit}>
      <div>
        name:{' '}
        <input
          type='text'
          value={username}
          onChange={({ target }) => {
            setUsername(target.value);
          }}
        />
      </div>
      <div>
        password:{' '}
        <input
          type='password'
          value={password}
          onChange={({ target }) => {
            setPassword(target.value);
          }}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  );
};

export default LoginForm;
