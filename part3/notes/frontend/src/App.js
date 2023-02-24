import { useEffect, useState } from 'react';
import noteService from './services/note';
import Note from './components/Note';
import Notification from './components/Notification';
import Footer from './components/Footer';

const App = (props) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    noteService.getAll().then((initalNotes) => {
      setNotes(initalNotes);
    });
  }, []);

  const addNote = async (event) => {
    event.preventDefault();

    const noteObject = {
      content: newNote,
      important: false,
    };

    const savedNote = await noteService.create(noteObject);

    setNotes(notes.concat(savedNote));
    setNewNote('');
  };

  const toggleImportanceOf = async (id) => {
    const noteToUpdate = notes.find((note) => note.id === id);
    const updatedNoteObject = { ...noteToUpdate, important: !noteToUpdate.important };

    try {
      const updatedNote = await noteService.update(id, updatedNoteObject);
      setNotes(notes.map((note) => (note.id === updatedNote.id ? updatedNote : note)));
    } catch (error) {
      setErrorMessage(`Note '${noteToUpdate.content}' was already removed from server`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      setNotes(notes.filter((n) => n.id !== id));
    }
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button
          onClick={() => {
            setShowAll(!showAll);
          }}
        >
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => {
              toggleImportanceOf(note.id);
            }}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={({ target }) => {
            setNewNote(target.value);
          }}
        />
        <button type='submit'>save</button>
      </form>
      <Footer />
    </div>
  );
};

export default App;
