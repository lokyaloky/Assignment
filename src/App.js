import { useEffect, useState } from "react";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import styled from "styled-components";

const StyledCard = styled(Card)`
  width: 100%;
  height: 100%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);
  transition: 0.6s;
  border-radius: 10px;
  
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0,0.9);
  }
`;

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/posts')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data.posts)) {
          setPosts(data.posts);
        } else {
          console.error('API response is not an array:', data);
        }
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });

  }, []);

  return (
    <div className='App'>
      <h1>Posts</h1>
      <Grid container spacing={2}>
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <StyledCard>
              <CardMedia
                component="img"
                height="200"
                image={`https://picsum.photos/id/${post.id}/200/200`}
                alt="placeholder"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.body}
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default App;
