import { useUser } from './contexts/UserContext';
import { useInitialUser } from './contexts/UserContext';
import LoginForm from './components/LoginForm';
import { useEffect } from 'react';
import Blogs from './components/Blogs';

const App = () => {
  const user = useUser();
  const initialUser = useInitialUser();

  useEffect(() => {
    initialUser();
  }, []);

  const home = () => {
    if (!user) {
      return <LoginForm />;
    }
    return <Blogs />;
  };

  return <div>{home()}</div>;
};

export default App;
