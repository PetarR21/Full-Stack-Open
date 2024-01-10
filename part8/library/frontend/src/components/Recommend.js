import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { ALL_BOOKS, ME } from '../queries';

const Recommend = (props) => {
  const [favouriteGenre, setFavouriteGenre] = useState(null);

  const meQuery = useQuery(ME);
  const genreBooks = useQuery(ALL_BOOKS, {
    variables: { genre: favouriteGenre },
    skip: !favouriteGenre,
  });

  useEffect(() => {
    if (meQuery.data) {
      setFavouriteGenre(meQuery.data.me.favouriteGenre);
    }
  }, [meQuery.data]);

  if (!props.show || meQuery.loading || genreBooks.loading) {
    return null;
  }

  const books = genreBooks.data.allBooks;

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favourite genre {favouriteGenre}</p>
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
    </div>
  );
};

export default Recommend;
