import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import styled from "styled-components";
import { Share } from "@mui/icons-material";

const StyledCard = styled(Card)`
  width: 100%;
  height: 100%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);
  transition: 0.6s;
  border-radius: 10px;

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.9);
  }
`;

function App() {
  const [products, setProducts] = useState([]);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error("API response is not an array:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleAddComment = (productId) => {
    const newReview = {
      productId,
      comment,
    };
    setReviews((prevReviews) => [...prevReviews, newReview]);
    setComment("");
  };

  const handleShare = (productId) => {
    // Perform share functionality here
    console.log("Sharing product with ID:", productId);
  };

  return (
    <div className="App">
      <h1>Products</h1>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <StyledCard>
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
                <TextField
                  label="Add a comment"
                  value={comment}
                  onChange={handleCommentChange}
                  fullWidth
                  margin="normal"
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddComment(product.id)}
                >
                  Add Comment
                </Button>
                <Typography variant="h6" gutterBottom>
                  Reviews:
                </Typography>
                {reviews
                  .filter((review) => review.productId === product.id)
                  .map((review, index) => (
                    <Typography variant="body1" key={index}>
                      - {review.comment}
                    </Typography>
                  ))}
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<Share />}
                  onClick={() => handleShare(product.id)}
                >
                  Share
                </Button>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default App;
