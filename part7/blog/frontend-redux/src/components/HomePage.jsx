import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Notification from './Notification';
import Blogs from './Blogs';
import Blog from './Blog';
import Users from './Users';
import User from './User';
import LoggedUser from './LoggedUser';
import NavigationMenu from './NavigationMenu';

const HomePage = () => {
  return (
    <div>
      <NavigationMenu />
      <h2>blogs</h2>
      <Notification />
      <Routes>
        <Route path='/' element={<Blogs />} />
        <Route path='/blogs/:id' element={<Blog />} />
        <Route path='/users' element={<Users />} />
        <Route path='/users/:id' element={<User />} />
      </Routes>
    </div>
  );
};

export default HomePage;
