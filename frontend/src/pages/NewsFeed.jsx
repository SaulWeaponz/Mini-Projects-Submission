import { useState, useEffect } from 'react';
import { TextInput, Card, Text, Button, Select, Loader, Image } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export default function NewsFeed() {
  const [posts, setPosts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:1337/api/posts?populate=coverimage`)
      .then(res => res.json())
      .then(data => {
        const results = data.data;
        setPosts(results);
        setFiltered(results);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filteredPosts = posts;

    if (search)
      filteredPosts = filteredPosts.filter(p =>
        p.title?.toLowerCase().includes(search.toLowerCase())
      );

    if (category)
      filteredPosts = filteredPosts.filter(p => p.category === category);

    setFiltered(filteredPosts);
  }, [search, category, posts]);

  const categories = [...new Set(posts.map(p => p.category))].filter(Boolean).map(cat => ({
    value: cat,
    label: cat,
  }));

  if (loading) return <Loader style={{ marginTop: '40px' }} />;

  return (
    <div style={{ padding: '20px' }}>
      <TextInput
        placeholder="Search by title"
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
        style={{ marginBottom: '10px' }}
      />
      <Select
        placeholder="Filter by category"
        data={categories}
        value={category}
        onChange={setCategory}
        clearable
        style={{ marginBottom: '20px' }}
      />

      {filtered.length === 0 ? (
        <Text color="red">No posts match your filters.</Text>
      ) : (
        filtered.map((post) => (
          <Card key={post.id} shadow="sm" padding="lg" style={{ marginBottom: '20px' }}>
            {post.coverimage?.formats?.thumbnail?.url && (
              <Image
                src={`http://localhost:1337${post.coverimage.formats.thumbnail.url}`}
                alt="cover"
                height={160}
                fit="cover"
                radius="md"
                style={{ marginBottom: '10px' }}
              />
            )}
            <Text weight={500} size="lg" mb={5}>
              {post.title}
            </Text>
            <Text size="sm" color="dimmed" mb={5}>
              {post.category}
            </Text>
            <Text size="sm" mb="md">
              {post.excerpt?.length > 150 ? post.excerpt.slice(0, 150) + '...' : post.excerpt}
            </Text>
            <Button
              variant="filled"
              color="blue"
              fullWidth
              radius="md"
              onClick={() => navigate(`/news/${post.id}`)}
            >
              Read More
            </Button>
          </Card>
        ))
      )}
    </div>
  );
}
