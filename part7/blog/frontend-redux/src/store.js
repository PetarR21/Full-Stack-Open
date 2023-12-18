import { configureStore } from '@reduxjs/toolkit';
import blogsReducer from './reducers/blogs';

const store = configureStore({
  reducer: {
    blogs: blogsReducer,
  },
});

export default store;
