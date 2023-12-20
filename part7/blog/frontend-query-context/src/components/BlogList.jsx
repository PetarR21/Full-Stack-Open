import { useQuery } from '@tanstack/react-query';
import blogService from '../services/blog';
import Blog from './Blog';

const BlogList = () => {
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  });

  if (result.isLoading) {
    return <div>Loading...</div>;
  }

  const blogs = result.data.sort((a, b) => b.likes - a.likes);

  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
