import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function SinglePost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      console.error('No post ID provided');
      setLoading(false);
      return;
    }

    fetch(`http://localhost:1337/api/posts/${id}?populate=coverimage`)
      .then(res => res.json())
      .then(data => {
        setPost(data.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching post:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!post) return <div>Post not found.</div>;

  const attributes = post.attributes;

  return (
    <div>
      <h1>{attributes.title}</h1>
      {attributes.coverimage?.data?.attributes?.formats?.thumbnail?.url && (
        <img
          src={`http://localhost:1337${attributes.coverimage.data.attributes.formats.thumbnail.url}`}
          alt="cover"
        />
      )}
      <p>{attributes.content || 'No content provided.'}</p>
    </div>
  );
}
