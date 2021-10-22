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
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import theme from "./Theme";
import axios from "axios";
import { getCart, addToCart, orderCartItems, getHeroText } from "../store";

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
    console.log(added);
    addToCart(added, auth, history);
  };
  orderItem = () => {
    const { auth, history, products, orderCartItems } = this.props;
  }
  render() {
    const { addCount, subtractCount, addItemToCart } = this;
    const { count } = this.state;
    const { products } = this.props;
    const { id } = this.props.match.params;
    const product = products.find((product) => product.id * 1 === id * 1) || {};
    console.log('image:', product.imageUrl);
    return (
      <ThemeProvider theme={theme}>
        <div id="productDetail">
          <Grid
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
                  // {
                  //   backgroundImage: `url(` + `${product.imageUrl}` + `)`
                  // }
                  {
                    backgroundImage: `url("https://www.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dwf6e7234e/images/hi-res/25371_KPF.jpg?sw=1200&sh=1200&sfrm=png&q=80&bgcolor=f6f6f6")`
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
          </Grid>
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
    orderCartItems: (cart, auth, history) => 
      dispatch(orderCartItems(cart, auth, history)),
  };
};

export default connect(mapStateToProps, mapDispatch)(ProductDetail);
