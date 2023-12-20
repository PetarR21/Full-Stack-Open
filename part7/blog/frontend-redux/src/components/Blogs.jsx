import Notification from './Notification';
import User from './User';
import BlogForm from './BlogForm';
import BlogList from './BlogList';

const Blogs = () => {
  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        <User />
      </p>
      {<BlogForm />} {<BlogList />}
    </div>
  );
};

export default Blogs;
