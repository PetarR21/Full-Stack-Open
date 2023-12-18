import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    addBlog(state, action) {
      state.push(action.payload);
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
    updateBlog(state, action) {
      const { id, title, content } = action.payload;
      const blog = state.find((blog) => blog.id === id);
      if (blog) {
        blog.title = title;
        blog.content = content;
      }
    },
    setBlogs(state, action) {
      return action.payload;
    },
  },
});

export const { addBlog, removeBlog, updateBlog, setBlogs } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    console.log(blogs);
    dispatch(setBlogs(blogs));
  };
};

export default blogSlice.reducer;
