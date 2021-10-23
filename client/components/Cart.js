import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, ThemeProvider, Paper } from "@mui/material";
import theme from "./Theme";
import { orderCartItems, completeOrder, createOrder } from "../store";

class Cart extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
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
    // const myCart = cart || [];
    const checkOut = () => {
      orderCartItems(cart, auth, history);
      completeOrder(order);
      createOrder(auth);
    };
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
            {cartProducts.map((item) => {
              const product = products.find(
                (product) => item === product.id
              );
              const linkToProduct = `/products/${product.id}`;
              return (
                <div className="cartItem" key={item}>
                  <p key={item}>
                    <Link className="cartItemLink" to={linkToProduct}>
                      <strong>{product.name}</strong>
                    </Link>
                  </p>
                  <p>Quantity: {cartInventory[item]}</p>
                </div>
              );
            })}
            <Button variant={"auth-button"} onClick={checkOut}>
              Check Out Now
            </Button>
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
    orderCartItems: (cart, auth, history) =>
      dispatch(orderCartItems(cart, auth, history)),
    completeOrder: (order) => dispatch(completeOrder(order)),
    createOrder: (auth) => dispatch(createOrder(auth)),
  };
};

export default connect(mapStateToProps, mapDispatch)(Cart);
