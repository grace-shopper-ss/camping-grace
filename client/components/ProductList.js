import React from "react";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Button, Grid, Stack, ThemeProvider, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import theme from './Theme';

const ProductList = () => {
  
  const products = useSelector((state) => state.products) || [];

  return (
    <ThemeProvider theme={theme}>
      <div id="productList">
        <Grid container spacing={2} justifyContent="center" alignItems="center">
        {products.map((product) => {
          const linkToProduct = `/products/${product.id}`;       
             
          return (
            <Grid item xs={8} md={4} s={5} key={ product.id } justifyContent="center">
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={product.imageUrl + '.jpg'}
                  alt={product.name}
                  />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} lg={6}>
                      <Button fullWidth variant="contained" color="success">Add to Cart</Button>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Link to={linkToProduct}>
                        <Button fullWidth variant="contained" color="success">See Details</Button>
                      </Link>
                    </Grid>
                  </Grid>
                </CardActions>
              </Card>            
            </Grid>  
          );
        })}
        </Grid>        
      </div>
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

export default connect(mapStateToProps)(ProductList);
