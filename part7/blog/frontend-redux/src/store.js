import { configureStore } from '@reduxjs/toolkit';
import blogsReducer from './reducers/blogs';
import notificationReducer from './reducers/notification';

const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    notification: notificationReducer,
  },
});

export default store;
