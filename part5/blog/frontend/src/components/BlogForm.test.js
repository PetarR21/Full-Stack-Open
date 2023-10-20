import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BlogForm from './BlogForm';
import userEvent from '@testing-library/user-event';

describe('BlogForm', () => {
  test('<BlogForm /> updates parent state and calls onSubmit', async () => {
    const onCreate = jest.fn();
    const user = userEvent.setup();
    render(<BlogForm addBlog={onCreate} />);

    const blogToCreate = {
      author: 'Kalle Ilves',
      title: 'Testing is pretty easy',
      url: 'https://testing-library.com/docs/react-testing-library/intro/',
    };

    const authorInput = screen.getByPlaceholderText('author of the blog');
    await user.type(authorInput, blogToCreate.author);

    const titleInput = screen.getByPlaceholderText('title of the blog');
    await user.type(titleInput, blogToCreate.title);

    const urlInput = screen.getByPlaceholderText('url of the blog');
    await user.type(urlInput, blogToCreate.url);

    const createButton = screen.getByText('create');
    await user.click(createButton);

    expect(onCreate.mock.calls[0][0]).toEqual(blogToCreate);
  });
});
