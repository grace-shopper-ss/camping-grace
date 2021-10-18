import React from "react";
import { connect } from "react-redux";
import Button from "@mui/material/Button";
import axios from "axios";

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      availableProducts: [],
    };
  }
  async componentDidMount() {
    const { id } = this.props.match.params;
    const { data: products } = await axios.get("/api/inventories");
    const avail = products.filter(
      (prod) => prod.productId * 1 === id * 1 && prod.status === "available"
    );
    this.setState({ availableProducts: avail });
  }
  render() {
    const { products } = this.props;
    const { availableProducts } = this.state;
    const { id } = this.props.match.params;
    const product = products.find((product) => product.id * 1 === id * 1) || {};
    return (
      <div id="productDetail">
        <h1>Product Detail:</h1>
        <h2> {product.name} </h2>
        <p>Id: {product.id}</p>
        <ul>{availableProducts.map(p => <li key={p.id}>{p.id}, {p.status}</li>)}</ul>
        <Button variant="contained">Add to Cart</Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

export default connect(mapStateToProps)(ProductDetail);
