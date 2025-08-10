import { createContext, useState, useEffect, ReactNode } from 'react';
import api from '@/api';

interface Blog {
  _id: string;
  title: string;
  author: string;
  content: string;
  category: string;
  tags: string[];
  slug: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

interface BlogContextType {
  blogs: Blog[];
  loading: boolean;
  error: string | null;
  deleteBlog: (id: string) => void;
}

export const BlogContext = createContext<BlogContextType>({
  blogs: [],
  loading: true,
  error: null,
  deleteBlog: () => {},
});

export const BlogProvider = ({ children }: { children: ReactNode }) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await api.get('/content/blogs');
        const blogsWithFullImageUrls = response.data.map((blog: Blog) => ({
          ...blog,
          imageUrl: `https://thybackend.onrender.com${blog.imageUrl}`,
        }));
        setBlogs(blogsWithFullImageUrls);
      } catch (err) {
        setError('Failed to fetch blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const deleteBlog = async (id: string) => {
    try {
      await api.delete(`/content/blogs/${id}`);
      setBlogs(blogs.filter((blog) => blog._id !== id));
    } catch (err) {
      setError('Failed to delete blog');
    }
  };

  return (
    <BlogContext.Provider value={{ blogs, loading, error, deleteBlog }}>
      {children}
    </BlogContext.Provider>
  );
};
