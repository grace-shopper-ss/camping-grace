import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, ThemeProvider, Paper } from '@mui/material';
import theme from "./Theme";
import { orderCartItems } from "../store";

class Cart extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { cart, products, auth, history, orderCartItems } = this.props;
    const myCart = cart || [];
    const checkOut = () => {
      orderCartItems(myCart, auth, history);
    };
    return (
      <ThemeProvider theme={theme}>     
        <div id="cartContainer">
          <h1>Cart Items:</h1>
          <Paper sx={{p:'.5em', m:'.5em'}}>
            {myCart.map((item) => {
              const product = products.find((product) => item.productId === product.id);
              const linkToProduct = `/products/${product.id}`;
              return(
                <div key={item.id}>
                  <p key={item.id}>
                    <Link className="cartItemLink" to={linkToProduct}><strong>{product.name}</strong></Link>
                  </p>
                  <ul>
                    <li>Price: ${product.price}</li>
                    <li>Inventory ID: {item.inventoryId}</li>
                  </ul>
                </div>
              )
            })}
            <Button variant={'auth-button'}  onClick={checkOut}>Check Out Now</Button>
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
  };
};

const mapDispatch = (dispatch) => {
  return {
    orderCartItems: (cart, auth, history) =>
      dispatch(orderCartItems(cart, auth, history)),
  }
}

export default connect(mapStateToProps, mapDispatch)(Cart);
