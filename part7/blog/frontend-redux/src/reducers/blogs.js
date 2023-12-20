import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import { setNotification } from './notification';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload);
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
    updateBlog(state, action) {
      const blog = action.payload;
      return state.map((b) => (b.id === blog.id ? blog : b));
    },
    setBlogs(state, action) {
      return action.payload;
    },
  },
});

export const { appendBlog, removeBlog, updateBlog, setBlogs } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blog, clear, hide) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blog);
      dispatch(appendBlog(newBlog));
      dispatch(
        setNotification(
          {
            message: `Blog '${blog.title}' by ${blog.author} created successfully`,
            type: 'success',
          },
          5
        )
      );
      clear();
      hide();
    } catch (error) {
      console.log(error);
      dispatch(setNotification({ message: error.response.data.error, type: 'error' }, 5));
    }
  };
};

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blog.id);
      dispatch(removeBlog(blog.id));
      dispatch(
        setNotification(
          {
            message: `Blog '${blog.title}' by '${blog.author}' deleted successfully`,
            type: 'success',
          },
          5
        )
      );
    } catch (error) {
      dispatch(setNotification({ message: error.response.data.error, type: 'error' }, 5));
    }
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.update(blog.id, {
        likes: blog.likes + 1,
      });
      dispatch(updateBlog(updatedBlog));
      dispatch(
        setNotification(
          {
            message: `Blog '${blog.title}' by '${blog.author}' deleted successfully`,
            type: 'success',
          },
          5
        )
      );
    } catch (error) {
      dispatch(setNotification({ message: error.response.data.error, type: 'error' }, 5));
    }
  };
};

export default blogSlice.reducer;
