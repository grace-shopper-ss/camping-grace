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
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import theme from "./Theme";
import axios from "axios";
import {
  addToCart,
  orderCartItems,
  getHeroText,
  reserveCartItems,
} from "../store";

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      availableProducts: [],
      count: 0,
      product: null,
    };
    this.addCount = this.addCount.bind(this);
    this.subtractCount = this.subtractCount.bind(this);
    this.addItemToCart = this.addItemToCart.bind(this);
  }
  async componentDidMount() {
    const { products } = this.props;
    const { id } = this.props.match.params;
    const { data: inventory } = await axios.get("/api/inventories");
    const avail = inventory.filter(
      (prod) => prod.productId === id * 1 && prod.status === "available"
    );
    const product = products.find((p) => p.id * 1 === id * 1);
    this.setState({ availableProducts: avail, count: 0, product });
  }
  async componentDidUpdate(prevProps) {
    const { id } = this.props.match.params;
    if (this.props.products !== prevProps.products) {
      const { loadHeroText, products } = this.props;
      const product = products.find((p) => p.id * 1 === id * 1);
      loadHeroText(product.category.toUpperCase());
      this.setState({ product });
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
    const { order, history, products, addToCart, reserveCartItems } =
      this.props;
    const { availableProducts, count } = this.state;
    const added = availableProducts.slice(0, count).map((product) => {
      const cartItem = {};
      const productObj = products.find((p) => product.productId === p.id);
      cartItem.orderId = order.id;
      cartItem.inventoryId = product.id;
      cartItem.productId = productObj.id;
      return cartItem;
    });
    addToCart(added, order, history);
    reserveCartItems(added, history);
  };
  render() {
    const { addCount, subtractCount, addItemToCart } = this;
    const { products } = this.props;
    const { count, product } = this.state;
    const { id } = this.props.match.params;

    if (product) {
      return (
        <ThemeProvider theme={theme}>
          <div id="productDetail">
            <Container maxWidth="lg">
              <Box
                mt={2}
                p={2}
                sx={{
                  backgroundColor: "white",
                  borderRadius: "3px",
                  align: "center",
                }}
              >
                <Grid container justifyContent={"center"} spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Paper elevation={6} component={"div"}>
                      <img
                        src={`/${product.imageUrl}`}
                        className="productImage"
                        alt={`Image of ${product.name}`}
                      />
                    </Paper>
                  </Grid>
                </Grid>
                <h1 id="productPriceHeading">
                  {product.name} <br />
                  <LocalOfferIcon />
                  <span className="productPriceText">
                    $
                    {product.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </span>
                </h1>
                <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={12}>
                    <IconButton
                      onClick={subtractCount}
                      size="large"
                      aria-label="subtract quantity"
                      color="inherit"
                    >
                      <RemoveIcon />
                    </IconButton>
                    <div className="counterButton">{count}</div>
                    <IconButton
                      onClick={addCount}
                      size="large"
                      aria-label="add quantity"
                      color="inherit"
                    >
                      <AddIcon />
                    </IconButton>
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
                  </Grid>
                </Grid>
              </Box>
            </Container>
          </div>
        </ThemeProvider>
      );
    }
    else {
      return(
        <h1>Loading...</h1>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
    heroText: state.hero,
    cart: state.cart,
    auth: state.auth,
    order: state.order,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadHeroText(heroHeading) {
      dispatch(getHeroText(heroHeading));
    },
    addToCart: (cart, auth, history) =>
      dispatch(addToCart(cart, auth, history)),
    reserveCartItems: (cart, history) =>
      dispatch(reserveCartItems(cart, history)),
    orderCartItems: (cart, history) => dispatch(orderCartItems(cart, history)),
  };
};

export default connect(mapStateToProps, mapDispatch)(ProductDetail);
