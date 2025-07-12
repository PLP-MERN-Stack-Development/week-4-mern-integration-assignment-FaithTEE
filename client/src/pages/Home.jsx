import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PostCard from '../components/posts/PostCard';
import Spinner from '../components/common/Spinner';
import useApi from '../hooks/useApi';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { get, loading } = useApi();

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await get('/api/posts');
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <section className="bg-blue-50 py-16 mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">
            Water Conservation in South Africa
          </h1>
          <p className="text-xl text-blue-600 max-w-2xl mx-auto">
            Learn about the importance of water conservation and how you can contribute to preserving this precious resource.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8">Latest Articles</h2>
        
        {loading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;