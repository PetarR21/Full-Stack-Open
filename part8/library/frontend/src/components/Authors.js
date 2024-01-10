import { useMutation, useQuery } from '@apollo/client';
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries';
import { useState } from 'react';

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS);
  const [editAuthor] = useMutation(EDIT_AUTHOR);
  const [birthyear, setBirthyear] = useState('');

  if (!props.show || result.loading) {
    return null;
  }

  const authors = result.data.allAuthors;

  const submit = (event) => {
    event.preventDefault();

    editAuthor({
      variables: { name: event.target.nameSelection.value, setBornTo: Number(birthyear) },
    });

    setBirthyear('');
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {props.token && (
        <>
          <h3>Set birthyear</h3>
          <form onSubmit={submit}>
            <div>
              <select name='nameSelection'>
                {authors.map((author) => (
                  <option key={author.name} value={author.name}>
                    {author.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              birthyear:{' '}
              <input
                type='text'
                value={birthyear}
                onChange={({ target }) => {
                  setBirthyear(target.value);
                }}
              />
            </div>
            <div>
              <button type='submit'>update author</button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default Authors;
