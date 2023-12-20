import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../reducers/user';
import blogsService from '../services/blogs';

const User = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  if (!user) {
    return null;
  }

  return (
    <div>
      <p>
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
      </p>
    </div>
  );
};

export default User;
