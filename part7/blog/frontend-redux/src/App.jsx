import { useEffect } from 'react';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import Blogs from './components/Blogs';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from './reducers/user';

const App = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  return <div>{user === null ? <LoginForm /> : <Blogs />}</div>;
};

export default App;
