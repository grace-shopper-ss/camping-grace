import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Container,
  Paper,
  Button,
  Box,
  Grid,
  Stack,
  ThemeProvider,
  IconButton,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import theme from "./Theme";
import axios from "axios";
import { getCart, addToCart, orderCartItems, getHeroText, addToGuestCart } from "../store";

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      availableProducts: [],
      count: 0,
    };
    this.addCount = this.addCount.bind(this);
    this.subtractCount = this.subtractCount.bind(this);
    this.addItemToCart = this.addItemToCart.bind(this);
  }
  async componentDidMount() {
    const { id } = this.props.match.params;
    const { data: inventory } = await axios.get("/api/inventories");
    const avail = inventory.filter(
      (prod) => prod.productId === id * 1 && prod.status === "available"
    );
    this.setState({ availableProducts: avail, count: 0 });
  }
  async componentDidUpdate(prevProps) {
    const { id } = this.props.match.params;
    if (this.props.products !== prevProps.products) {
      const { loadHeroText, products } = this.props;
      const product = products.find((p) => p.id * 1 === id * 1);
      loadHeroText(product.category.toUpperCase());
    }
  }
  addCount = () => {
    let { count } = this.state;
    const { availableProducts } = this.state;
    const max = availableProducts.length;
    if (count === max) {
      throw "We don't have enough stock";
    }
    this.setState({ count: count + 1 });
  };
  subtractCount = () => {
    let { count } = this.state;
    if (count === 0) {
      throw "We can't sell you less than 0!";
    }
    this.setState({ count: count - 1 });
  };
  addItemToCart = () => {
    const { auth, history, products, addToCart } = this.props;
    const { availableProducts, count } = this.state;
    const added = availableProducts.slice(0, count).map((product) => {
      const cartItem = {};
      // placeholder for current order (which will go on auth obj)
      cartItem.orderId = auth.id;
      cartItem.inventoryId = product.id;
      const productObj = products.find((p) => product.productId === p.id);
      cartItem.productId = productObj.id;
      return cartItem;
    });
    // Everything above this can stay the same for both guest and members. We need to now either dispatch
    //    a thunk if adding to a members cart, as that will require a PUT axios call
    //    or an action for LocalCart state on store. 
    // To Do: add ternary check, IF GUEST, dispatch different action to insert 'added' to localCart.
    
    addToCart(added, auth, history);
    // addToLocalCart(added, history)
  };

  // Guest clone
  addGuestCartItems = () => {
    const { auth, history, products, addToGuestCart } = this.props;
    const { availableProducts, count } = this.state;
    const added = availableProducts.slice(0, count).map((product) => {
      const cartItem = {};
      // placeholder for current order (which will go on auth obj)
      cartItem.orderId = 'guest'
      cartItem.inventoryId = product.id;
      const productObj = products.find((p) => product.productId === p.id);
      cartItem.productId = productObj.id;
      return cartItem;
    });
    // Everything above this can stay the same for both guest and members. We need to now either dispatch
    //    a thunk if adding to a members cart, as that will require a PUT axios call
    //    or an action for LocalCart state on store. 
    // To Do: add ternary check, IF GUEST, dispatch different action to insert 'added' to localCart.
    
    addToGuestCart(added, history);
    // addToLocalCart(added, history)
  };

  orderItem = () => {
    const { auth, history, products, orderCartItems, addToGuestCart } = this.props;
  }
  render() {
    const { addCount, subtractCount, addItemToCart, addGuestCartItems } = this;
    const { count } = this.state;
    const { products } = this.props;
    const { id } = this.props.match.params;
    const product = products.find((product) => product.id * 1 === id * 1) || {};
    return (
      <ThemeProvider theme={theme}>
        <div id="productDetail">
          <Container maxWidth="lg">
            <Box
              mt={2}
              p={2}
              sx={{
                backgroundColor: 'white',
                borderRadius: '3px',
                align: 'center'
              }}
            >
              <Grid container justifyContent={'center'}spacing={2}>
                <Grid item xs={12} md={6}>
                  <Paper
                    elevation={6}
                    component={'div'}
                  >
                       <img src={`/${product.imageUrl}`} className="productImage" alt={`Image of ${product.name}`} />
                  </Paper>
                </Grid>
              </Grid>
              <h1 id="productPriceHeading">{product.name} <span className="productPriceText">${product.price}</span></h1>
              <p id="productId">
                Product No. {product.id} <br /> &nbsp;
              </p>
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12}>
                  <IconButton onClick={subtractCount} size="large" aria-label="subtract quantity" color="inherit">
                    <RemoveIcon />
                  </IconButton>
                  {/* <Button className="counterButton" onClick={subtractCount}>
                    -
                  </Button> */}
                  <div className="counterButton">
                    {count}
                  </div>
                  <IconButton onClick={addCount} size="large" aria-label="add quantity" color="inherit">
                    <AddIcon />
                  </IconButton>
                  {/* <Button className="counterButton" onClick={addCount}>
                    +
                  </Button> */}
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Button
                    fullWidth
                    variant="cartButton"
                    // color="success"
                    onClick={addItemToCart}
                  >
                    Add to Cart
                  </Button>
                  <Button 
                    fullWidth
                    variant="cartButton"
                    onClick={addGuestCartItems}
                  >
                    Add to Guest Cart
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Container>

          {/* <Grid
            item
            xs={8}
            md={4}
            s={5}
            key={product.id}
            justifyContent="center"
          >
            <Card sx={{ maxWidth: 345 }}>
              <CardContent 
                className="cardImageContainer cardImage"
                style={
                  {
                    backgroundImage: `url(` + `/${product.imageUrl}` + `)`
                  }
                }                   
              >
                Hello World
              </CardContent>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
              </CardContent>
              <CardActions>
                <Grid container spacing={2} justifyContent="center">
                  <Button className="counterButton" onClick={subtractCount}>
                    -
                  </Button>
                  <div className="counterButton">{count}</div>
                  <Button className="counterButton" onClick={addCount}>
                    +
                  </Button>
                  <Grid item xs={12} lg={6}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="success"
                      onClick={addItemToCart}
                    >
                      Add to Cart
                    </Button>
                  </Grid>
                </Grid>
              </CardActions>
            </Card>
          </Grid> */}
        </div>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
    heroText: state.hero,
    cart: state.cart,
    localCart: state.localCart,
    auth: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadHeroText(heroHeading) {
      dispatch(getHeroText(heroHeading));
    },
    addToCart: (cart, auth, history) =>
      dispatch(addToCart(cart, auth, history)),
    addToGuestCart: (cart, history) => 
      dispatch(addToGuestCart(cart, history)),
    orderCartItems: (cart, auth, history) => 
      dispatch(orderCartItems(cart, auth, history)),
  };
};

export default connect(mapStateToProps, mapDispatch)(ProductDetail);
