import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, ThemeProvider, Paper } from "@mui/material";
import theme from "./Theme";
import LocalCart from "./LocalCart";
import { orderCartItems, completeOrder, createOrder, submitGuestOrder } from "../store";
import auth from "../store/auth";

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      localCartState: [],
    };
    this.calcTotal = this.calcTotal.bind(this);
    this.setCartState = this.setCartState.bind(this);
  }
  calcTotal() {
    const { total, localCartState } = this.state;
    const { cart, products } = this.props;
    const productCount = localCartState.reduce((acc, val) => {
      // * change to  {local-state-cart}.reduce()
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
  setCartState() {
    const { cart, localCart, auth } = this.props;
    if (!auth.id) {
      console.log('not logged in', localCart)
      this.setState({ localCartState: localCart })
    }
    else {
      console.log('logged in', cart)
      this.setState({ localCartState: cart})
    }
  }
  componentDidMount() {
    this.calcTotal();
    this.setCartState();
  }
  componentDidUpdate(prevProps) {
    const { cart, localCart, auth } = this.props;
    if (cart.length !== prevProps.cart.length) this.calcTotal();
    else if (localCart.length !== prevProps.localCart.length) this.calcTotal();
    // if ((!!auth.id.length) && (!prevProps.auth.id.length)) this.setState({ localCartState: cart });
    if ((auth.id) && !prevProps.auth.id ) {
      this.setState({ localCartState: cart })
      this.setCartState();
    }
    if ((!auth.id) && prevProps.auth.id) {
      this.setState({ localCartState: localCart })
      this.setCartState();
    }
    // this.setCartState();
    // if ((this.props.auth.id) && (!prevProps.auth.id)) this.setCartState();
    // else if ((!this.props.auth.id) && (!!prevProps.auth.id)) this.setCartState();
    // else if (this.props.localCart.length !== prevProps.localCart.length) this.calcTotal();
  }
  render() {
    const { total, localCartState } = this.state;
    const {
      cart,
      products,
      auth,
      history,
      orderCartItems,
      completeOrder,
      submitGuestOrder,
      createOrder,
      order,
    } = this.props;
    const checkOut = () => {
      orderCartItems(cart, auth, history);
      // * To Do : change cart to point to {local-state-cart}
      // * To Do: add 'completeGuestOrder' & ternary check
      submitGuestOrder(order)
      completeOrder(order);
      createOrder(auth);
    };
    const cartProducts = cart.reduce((acc, val) => {
      // * Change to cartProducts = {local-state-cart}.reduce()
      if (!acc.includes(val.productId)) {
        acc.push(val.productId);
      }
      return acc;
    }, []);
    const cartInventory = cart.reduce((acc, val) => {
      // * change to cartInventory = {local-state-cart}.reduce()
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
    localCart: state.localCart,
    products: state.products,
    order: state.order,
  };
};

const mapDispatch = (dispatch) => {
  return {
    orderCartItems: (cart, auth, history) =>
      dispatch(orderCartItems(cart, auth, history)),

    completeOrder: (order) => 
      dispatch(completeOrder(order)),
    submitGuestOrder: (order) => 
      dispatch(submitGuestOrder(order)),
    createOrder: (auth) => 
      dispatch(createOrder(auth)),
  };
};

export default connect(mapStateToProps, mapDispatch)(Cart);
