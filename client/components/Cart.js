import React from "react";
import { connect } from "react-redux";

class Cart extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { cart, products } = this.props;
    const myCart = cart || []
    return (
      <div>
        <h1>Cart Items:</h1>
        {myCart.map((item) => (
          <p key={item.id}>
            {products.find((product) => item.productId === product.id).name}
          </p>
        ))}
      </div>
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

export default connect(mapStateToProps)(Cart);
