/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from 'react';

const reducer = (state, action) => {
  if (action.type === 'SET') {
    return action.payload;
  }
  if (action.type === 'CLEAR') {
    return null;
  }
  return state;
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [value, dispatch] = useReducer(reducer, null);

  return (
    <NotificationContext.Provider value={[value, dispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const [value] = useContext(NotificationContext);

  return value;
};

let timeoutID = null;

export const useNotify = () => {
  const [, dispatch] = useContext(NotificationContext);

  return (message, type) => {
    clearTimeout(timeoutID);
    dispatch({
      type: 'SET',
      payload: { message, type },
    });
    timeoutID = setTimeout(() => {
      dispatch({
        type: 'CLEAR',
      });
    }, 5000);
  };
};

export default NotificationContext;
