import { useEffect, useState } from 'react';
import noteService from './services/note';
import Note from './components/Note';

const App = (props) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);

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
    const noteToUpdate = notes.find((note) => +note.id === +id);
    const updatedNoteObject = { ...noteToUpdate, important: !noteToUpdate.important };

    const updatedNote = await noteService.update(id, updatedNoteObject);
    setNotes(notes.map((note) => (note.id === updatedNote.id ? updatedNote : note)));
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  return (
    <div>
      <h1>Notes</h1>
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
    </div>
  );
};

export default App;
