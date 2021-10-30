import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  ThemeProvider,
  Paper,
  Grid,
  Card,
  CardActions,
  CardContent,
} from "@mui/material";
import axios from "axios";
import theme from "./Theme";
import { addToCart, removeCartItems, reserveCartItems } from "../store";

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
    };
    this.calcTotal = this.calcTotal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  calcTotal() {
    const { cart, products } = this.props;
    const productCount = cart.reduce((acc, val) => {
      acc[val.productId] = acc[val.productId] || 0;
      acc[val.productId]++;
      return acc;
    }, {});
    let cost = 0;
    Object.keys(productCount).map((id) => {
      const product = products.find((product) => product.id === parseInt(id));
      const quantity = productCount[id];
      cost = cost + product.price * quantity;
    });
    this.setState({
      total: cost,
    });
  }
  componentDidMount() {
    this.calcTotal();
  }
  componentDidUpdate(prevProps) {
    if (this.props.cart.length !== prevProps.cart.length) this.calcTotal();
  }
  async onChange(event) {
    event.persist();
    const {
      cart,
      order,
      history,
      products,
      addToCart,
      reserveCartItems,
      removeCartItems,
    } = this.props;
    const value = event.target.value;
    const id = event.target.id;
    const cartItems = cart.filter(
      (product) => product.productId * 1 === id * 1
    );
    // check whether they are adding products, or removing products from the cart
    const difference = value - cartItems.length;
    // if adding, dispatch addToCart
    if (difference > 0) {
      const { data: inventory } = await axios.get("/api/inventories");
      const avail = inventory.filter(
        (prod) => prod.productId === id * 1 && prod.status === "available"
      );
      const added = avail.slice(0, difference).map((product) => {
        const cartItem = {};
        const productObj = products.find((p) => product.productId === p.id);
        cartItem.orderId = order.id;
        cartItem.inventoryId = product.id;
        cartItem.productId = productObj.id;
        return cartItem;
      });
      addToCart(added, order, history);
      reserveCartItems(added, history);
    }
    // if removing, dispatch removeCartItems
    if (difference < 0) {
      removeCartItems(cartItems.slice(0, Math.abs(difference)), order, history);
    }
  }
  handleSubmit(event) {
    event.preventDefault();
    this.calcTotal();
  }
  render() {
    const { handleSubmit, onChange } = this;
    const { total } = this.state;
    const {
      cart,
      products,
      auth,
      history,
      orderCartItems,
      completeOrder,
      createOrder,
      order,
    } = this.props;
    const cartProducts = cart.reduce((acc, val) => {
      if (!acc.includes(val.productId)) {
        acc.push(val.productId);
      }
      return acc;
    }, []);
    const cartInventory = cart.reduce((acc, val) => {
      acc[val.productId] = acc[val.productId] || 0;
      acc.inventory = acc.inventory || [];
      acc.inventory.push(val.inventoryId);
      acc[val.productId]++;
      return acc;
    }, {});

    return (
      <ThemeProvider theme={theme}>
        <div id="cartContainer">
          <h1>Cart Items:</h1>
          <Paper sx={{ p: ".5em", m: ".5em" }}>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item md={9} sm={12}>
                {cartProducts.map((item) => {
                  const product = products.find(
                    (product) => item === product.id
                  );
                  const quantity = cartInventory[item];
                  const totalProductSpend = quantity * product.price;
                  const linkToProduct = `/products/${product.category}/${product.id}`;
                  return (
                    <div className="cartItem" key={item}>
                      <Card
                        elevation={3}
                        sx={{ width: "95%", p: ".5em", m: ".5em" }}
                      >
                        <Grid
                          container
                          spacing={2}
                          justifyContent="center"
                          direction="column"
                          alignItems="center"
                        >
                          <Grid item xs={12}>
                            <div key={item} sx={{ textAlign: "center" }}>
                              <h2>
                                <Link
                                  className="cartItemLink"
                                  to={linkToProduct}
                                >
                                  {/* stephen pls fix */}
                                  <strong>{product.name}</strong>
                                  <br />
                                </Link>
                              </h2>
                              <h3 style={{ textAlign: "center" }}>
                                $
                                {product.price.toLocaleString("en-US", {
                                  style: "currency",
                                  currency: "USD",
                                })}
                              </h3>
                            </div>
                          </Grid>
                          <Grid
                            container
                            spacing={2}
                            justifyContent="center"
                            alignItems="center"
                          >
                            <Grid item lg={3} md={5} s={12} sm={12}>
                              <CardContent sx={{ textAlign: "center" }}>
                                <img
                                  className="cartItemPic"
                                  src={`/${product.imageUrl}`}
                                />
                              </CardContent>
                            </Grid>
                            <Grid item lg={9} md={12} s={12} sm={12}>
                              <CardActions>
                                <form
                                  className="productQuantitySelector"
                                  onSubmit={handleSubmit}
                                >
                                  <label htmlFor={product.name}>
                                    Quantity:
                                  </label>
                                  <select
                                    name={product.name}
                                    id={product.id}
                                    value={quantity}
                                    onChange={onChange}
                                    type="submit"
                                  >
                                    <option value="0">0 (Remove)</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                  </select>
                                </form>
                              </CardActions>
                            </Grid>
                          </Grid>
                          <Grid item md={12}>
                            Total cost:
                            {totalProductSpend.toLocaleString("en-US", {
                              style: "currency",
                              currency: "USD",
                            })}
                          </Grid>
                        </Grid>
                      </Card>
                    </div>
                  );
                })}
              </Grid>
              <Grid item md={3} sm={12}>
                <div className="cartCheckout">
                  <div>
                    Total:
                    {total.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </div>
                  <Link to="/checkout">
                    <Button variant={"auth-button"}>Check Out Now</Button>
                  </Link>
                </div>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    cart: state.cart,
    products: state.products,
    order: state.order,
  };
};

const mapDispatch = (dispatch) => {
  return {
    addToCart: (items, order, history) =>
      dispatch(addToCart(items, order, history)),
    removeCartItems: (items, order, history) =>
      dispatch(removeCartItems(items, order, history)),
    reserveCartItems: (items, history) =>
      dispatch(reserveCartItems(items, history)),
  };
};

export default connect(mapStateToProps, mapDispatch)(Cart);
