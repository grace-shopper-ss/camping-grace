import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      orderedProducts: [],
    };
  }
  async componentDidMount() {
    const { auth } = this.props;
    const { data: allOrders } = await axios.get("/api/orders");
    if (allOrders) {
      const orders = allOrders.filter((order) => order.userId === auth.id);
      const orderedProducts = orders
        .reduce((acc, val) => {
          acc.push(val.orderedproducts);
          return acc;
        }, [])
        .flat();
      this.setState({ orders, orderedProducts });
    }
  }
  render() {
    const { orders, orderedProducts } = this.state;
    return (
      <div>
        {/* {orders.map((o) => (
          <pre>{JSON.stringify(o, null, 2)}</pre>
        ))}
        <br /> */}
        {orderedProducts.map((o) => (
          <pre>{JSON.stringify(o, null, 2)}</pre>
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
    order: state.order,
  };
};

export default connect(mapStateToProps)(Account);
