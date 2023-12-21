import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../reducers/user';
import blogsService from '../services/blogs';

const LoggedUser = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  if (!user) {
    return null;
  }

  return (
    <span>
      {user.name} logged in{' '}
      <button
        onClick={() => {
          dispatch(setUser(null));
          blogsService.setToken(null);
          window.localStorage.clear();
        }}
      >
        log out
      </button>
    </span>
  );
};

export default LoggedUser;
