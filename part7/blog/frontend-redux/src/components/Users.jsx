import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { initializeUsers } from '../reducers/users';
import { Table } from 'react-bootstrap';

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
      <h2>Users</h2>
      <Table striped>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
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
      </Table>
    </div>
  );
};

export default Users;
