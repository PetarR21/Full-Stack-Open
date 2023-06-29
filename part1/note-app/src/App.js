import { useState } from 'react';

import Note from './components/Note';

const App = (props) => {
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState('a new note...');
  const [showAll, setShowAll] = useState(true);

  const addNote = (event) => {
    event.preventDefault();
    const newNoteObject = {
      id: notes.length + 1,
      content: newNote,
      important: Math.random() > 0.5,
    };

    setNotes(notes.concat(newNoteObject));
    setNewNote('');
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button type='button' onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={(event) => setNewNote(event.target.value)} />
        <button type='submit'>save</button>
      </form>
    </div>
  );
};

export default App;
