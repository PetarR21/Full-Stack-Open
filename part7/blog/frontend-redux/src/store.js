import { configureStore } from '@reduxjs/toolkit';
import blogsReducer from './reducers/blogs';
import userReducer from './reducers/user';
import notificationReducer from './reducers/notification';

const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    user: userReducer,
    notification: notificationReducer,
  },
});

export default store;
