import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { ADD_BOOK, ALL_AUTHORS, ALL_BOOKS } from '../queries';

const NewBook = (props) => {
  const [createBook] = useMutation(ADD_BOOK, {
    onCompleted: () => {
      props.setPage('books');
    },
    refetchQueries: [{ query: ALL_BOOKS, variables: { genre: null } }, { query: ALL_AUTHORS }],
    update: (cache, response) => {
      const addedBook = response.data.addBook;

      const uniqByTitle = (a) => {
        let seen = new Set();
        return a.filter((item) => {
          let k = item.title;
          return seen.has(k) ? false : seen.add(k);
        });
      };

      const genres = addedBook.genres.filter((genre) => {
        return cache.readQuery({ query: ALL_BOOKS, variables: { genre } });
      });

      genres.forEach((genre) => {
        cache.updateQuery({ query: ALL_BOOKS, variables: { genre } }, ({ allBooks }) => {
          return {
            allBooks: uniqByTitle(allBooks.concat(addedBook)),
          };
        });
      });
    },
  });

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [published, setPublished] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);

  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    createBook({ variables: { title, published: Number(published), author, genres } });

    setTitle('');
    setPublished('');
    setAuthor('');
    setGenres([]);
    setGenre('');
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre('');
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author
          <input value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input value={genre} onChange={({ target }) => setGenre(target.value)} />
          <button onClick={addGenre} type='button'>
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type='submit'>create book</button>
      </form>
    </div>
  );
};

export default NewBook;
