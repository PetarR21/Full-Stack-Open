import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import NotificationContext from './NotificationContext';
import { createAnecdote, getAnecdotes, updateAnecdote } from './requests';

const App = () => {
  const client = useQueryClient();
  const [notification, dispatch] = useContext(NotificationContext);

  const showNotification = (message) => {
    dispatch({ type: 'SET', payload: message });
    setTimeout(() => {
      dispatch({ type: 'REMOVE' });
    }, 4000);
  };

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['anecdotes'] });
    },
    onError: () => {
      showNotification('too short anecdote, must have length of 5 or more');
    },
  });

  const addAnecdote = (content) => {
    newAnecdoteMutation.mutate({ content, votes: 0 });
    showNotification(`Added anecdote '${content}'`);
  };

  const voteAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['anecdotes'] });
    },
  });

  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    showNotification(`Anecdote '${anecdote.content}' voted`);
  };

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1,
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return <div>anecdote service not avaible due to problems in server</div>;
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm addAnecdote={addAnecdote} />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
