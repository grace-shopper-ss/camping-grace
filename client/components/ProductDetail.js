import React, { useEffect } from "react";
import { connect } from "react-redux";
import Hero from "./Hero";
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { getHeroText } from "../store";



const ProductDetail = (props) => {
  const { products, loadHeroText } = props;
  const { id } = props.match.params;
  
  const categories = products.reduce((allCategories, product) => {  
    let idx = allCategories.findIndex(product.category);
    console.log(idx)
    if (idx === -1) allCategories.push(product.category)
    return allCategories;
  },[])

  const product = products.find((product) => product.id * 1 === id * 1) || {};
  const productImage = `${product.imageUrl}.jpeg`;
  const productName = `${product.category}` || 'All Products';

  console.log(productName);
  console.log('categories:', categories)
  
  useEffect( () => {
    loadHeroText(productName)
  });

  return (
    <div id="productDetail">
      <Hero />        
      <Container maxWidth="lg">
        <Box           
          mt={2}
          p={2}
          sx={{             
            backgroundColor: 'white',             
            borderRadius: '3px',
          }}
          
        >
          <Grid container justifyContent={'center'}spacing={2}>
            <Grid item xs={12} md={6} >
              <Paper 
                elevation={6}
                component={'div'}
              >
                <img src="https://www.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dwf6e7234e/images/hi-res/25371_KPF.jpg?sw=1200&sh=1200&sfrm=png&q=80&bgcolor=f6f6f6" className="productImage" alt={`Image of ${product.name}`} />
              </Paper>
            </Grid>
          </Grid>
          <h1>Product Detail:</h1>
          <h2> {product.name} </h2>
          <p>Id: {product.id}</p>
          <Button variant="contained">Add to Cart</Button>
        </Box>  
      </Container>
      <Paper />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
    heroText: state.hero,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadHeroText(heroHeading){
      dispatch(getHeroText(heroHeading))
    }
  }
}

export default connect(mapStateToProps, mapDispatch)(ProductDetail);
