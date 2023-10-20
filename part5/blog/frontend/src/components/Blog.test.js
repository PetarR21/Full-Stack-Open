import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

describe('Blog', () => {
  const blog = {
    title: 'test title',
    author: 'test author',
    url: 'test url',
    user: {
      name: 'test name',
      username: 'test username',
    },
  };

  let container;

  let likeHandler = jest.fn();

  beforeEach(() => {
    container = render(<Blog blog={blog} likeBlog={likeHandler} />).container;
  });

  test('renders content and shows author and title by default', () => {
    screen.getByText(blog.title, { exact: false });
    screen.getByText(blog.author, { exact: false });

    const detailsElement = container.querySelector('.blogDetails');
    expect(detailsElement).toHaveStyle('display: none');
  });

  test("blog's URL and number of likes are shown when the button", async () => {
    const user = userEvent.setup();
    const button = screen.getByText('view');
    await user.click(button);

    const detailsElement = container.querySelector('.blogDetails');
    expect(detailsElement).not.toHaveStyle('display: none');
  });

  test('if the like button is clicked twice, the event handler is called twice', async () => {
    const user = userEvent.setup();
    const viewButton = screen.getByText('view');
    const likeButton = container.querySelector('.likeBtn');

    await user.click(viewButton);
    await user.click(likeButton);
    await user.click(likeButton);

    expect(likeHandler.mock.calls).toHaveLength(2);
  });
});
