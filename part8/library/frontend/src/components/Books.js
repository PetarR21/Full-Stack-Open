import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';
import { useState } from 'react';

const Books = (props) => {
  const [genre, setGenre] = useState(null);

  const allBooksQuery = useQuery(ALL_BOOKS, {
    variables: { genre: null },
  });

  const genreBooksQuery = useQuery(ALL_BOOKS, {
    variables: { genre },
    skip: !genre,
  });

  if (!props.show || allBooksQuery.loading || genreBooksQuery.loading) {
    return null;
  }

  const allBooks = allBooksQuery.data.allBooks;

  const genres = [...new Set(allBooks.reduce((s, b) => s.concat(b.genres), []))];

  const books = genre ? genreBooksQuery.data.allBooks : allBooks;

  return (
    <div>
      <h2>books</h2>
      <p>in genre {!genre ? 'all' : genre}</p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <div>
          <button
            key='all'
            onClick={() => {
              setGenre('');
            }}
          >
            all
          </button>
          {genres.map((g) => (
            <button
              key={g}
              onClick={() => {
                setGenre(g);
              }}
            >
              {g}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Books;
