import { useLogout, useUser } from '../contexts/UserContext';

const User = () => {
  const user = useUser();

  const logout = useLogout();

  if (!user) {
    return null;
  }

  return (
    <div>
      <p>
        {user.name} logged in <button onClick={logout}>log out</button>
      </p>
    </div>
  );
};

export default User;
