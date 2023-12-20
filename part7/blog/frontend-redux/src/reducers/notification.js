import { createSlice } from '@reduxjs/toolkit';

let timeoutID = null;

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    set(state, action) {
      return action.payload;
    },
    clear(state, action) {
      return null;
    },
  },
});

const { set, clear } = notificationSlice.actions;

export const setNotification = (notification, timeout) => {
  return (dispatch) => {
    clearTimeout(timeoutID);
    dispatch(set(notification));
    timeoutID = setTimeout(() => {
      dispatch(clear());
    }, timeout * 1000);
  };
};

export default notificationSlice.reducer;
