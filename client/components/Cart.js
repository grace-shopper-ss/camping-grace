import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, ThemeProvider, Paper } from "@mui/material";
import theme from "./Theme";
import { orderCartItems, completeOrder, createOrder } from "../store";

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
    };
    this.calcTotal = this.calcTotal.bind(this);
  }
  calcTotal() {
    const { total } = this.state;
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
      total: total + cost,
    });
  }
  componentDidMount() {
    this.calcTotal();
  }
  componentDidUpdate(prevProps) {
    if (this.props.cart.length !== prevProps.cart.length) this.calcTotal();
  }
  render() {
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
    const checkOut = () => {
      orderCartItems(cart, history);
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
              const product = products.find((product) => item === product.id);
              const quantity = cartInventory[item];
              const totalProductSpend = quantity * product.price;
              const linkToProduct = `/products/${product.id}`;
              return (
                <div className="cartItem" key={item}>
                  <p key={item}>
                    <Link className="cartItemLink" to={linkToProduct}>
                      <strong>{product.name}</strong>
                    </Link>
                    , ${product.price}
                  </p>
                  <p>
                    Quantity: {quantity}, Total cost: ${totalProductSpend}
                  </p>
                </div>
              );
            })}
            <div>Total: ${total}</div>
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
    orderCartItems: (cart, history) =>
      dispatch(orderCartItems(cart, history)),
    completeOrder: (order) => dispatch(completeOrder(order)),
    createOrder: (auth) => dispatch(createOrder(auth)),
  };
};

export default connect(mapStateToProps, mapDispatch)(Cart);
