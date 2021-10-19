import React from "react";
import { connect } from "react-redux";
import { getCart } from "../store";

class Cart extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { getCart, match } = this.props;
    getCart(match.params.id);
  }
  componentDidUpdate(prevProps) {
    if (this.props.auth.id !== prevProps.auth.id) {
      this.fetchData(this.props.auth);
      this.props.getCart(this.props.match.params.id);
    }
  }
  render() {
    const { cart, products } = this.props;
    return (
      <div>
        <h1>Cart Items:</h1>
        {cart.map((item) => (
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

const mapDispatchToProps = (dispatch) => {
  return {
    getCart: (id) => dispatch(getCart(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
