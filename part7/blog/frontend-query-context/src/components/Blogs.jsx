import User from './User';
import BlogList from './BlogList';
import BlogForm from './BlogForm';
import Notification from './Notification';

const Blogs = () => {
  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      <User />
      <BlogForm />
      <BlogList />
    </div>
  );
};

export default Blogs;
