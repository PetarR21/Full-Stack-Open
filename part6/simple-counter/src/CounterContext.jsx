import { createContext, useReducer, useContext } from 'react';

const counterReducer = (state, action) => {
  switch (action.type) {
    case 'INC':
      return state + 1;
    case 'DEC':
      return state - 1;
    case 'ZERO':
      return 0;
    default:
      return state;
  }
};

const CounterContext = createContext();

export const useCounterValue = () => {
  return useContext(CounterContext)[0];
};

export const useCounterDispatch = () => {
  return useContext(CounterContext)[1];
};

export const CounterContextProvider = (props) => {
  const [counter, counterDispatch] = useReducer(counterReducer, 0);

  return (
    <CounterContext.Provider value={[counter, counterDispatch]}>
      {props.children}
    </CounterContext.Provider>
  );
};

export default CounterContext;
