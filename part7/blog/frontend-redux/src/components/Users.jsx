import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { initializeUsers } from '../reducers/users';

const Users = () => {
  const users = useSelector((state) => {
    return [...state.users].sort((a, b) => b.blogs.length - a.blogs.length);
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUsers());
  }, []);

  return (
    <div>
      <h3>Users</h3>
      <table>
        <tbody>
          {users.map((user) => {
            if (user.username !== 'root')
              return (
                <tr>
                  <td>
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                  </td>
                  <td>{user.blogs.length}</td>
                </tr>
              );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
