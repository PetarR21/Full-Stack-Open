/* eslint-disable react/prop-types */
import { createContext, useReducer, useContext } from 'react';
import loginService from '../services/login';
import storageService from '../services/storage';
import blogService from '../services/blog';

const reducer = (state, action) => {
  if (action.type === 'SET') {
    return action.payload;
  }
  if (action.type === 'CLEAR') {
    return null;
  }
  return state;
};

const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [counter, counterDispatch] = useReducer(reducer, null);

  return (
    <UserContext.Provider value={[counter, counterDispatch]}>{props.children}</UserContext.Provider>
  );
};

export const useUser = () => {
  const [value] = useContext(UserContext);

  return value;
};

export const useLogin = () => {
  const [, dispatch] = useContext(UserContext);

  return async (credentials) => {
    const user = await loginService.login(credentials);
    dispatch({
      type: 'SET',
      payload: user,
    });
    blogService.setToken(user.token);
    storageService.saveUser(user);
  };
};

export const useInitialUser = () => {
  const [, dispatch] = useContext(UserContext);

  return () => {
    const user = storageService.loadUser();
    if (user) {
      dispatch({
        type: 'SET',
        payload: user,
      });
      blogService.setToken(user.token);
    }
  };
};

export const useLogout = () => {
  const [, dispatch] = useContext(UserContext);

  return () => {
    dispatch({
      type: 'CLEAR',
    });
    storageService.removeUser();
    blogService.setToken(null);
  };
};

export default UserContext;
