import { configureStore } from '@reduxjs/toolkit';
import blogsReducer from './reducers/blogs';
import userReducer from './reducers/user';
import notificationReducer from './reducers/notification';
import usersReducer from './reducers/users';

const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    user: userReducer,
    notification: notificationReducer,
    users: usersReducer,
  },
});

export default store;
