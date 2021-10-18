import React from "react";
import { connect } from "react-redux";
import Button from "@mui/material/Button";
import axios from "axios";

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      availableProducts: [],
      count: 0,
    };
    this.addCount = this.addCount.bind(this);
    this.subtractCount = this.subtractCount.bind(this);
  }
  async componentDidMount() {
    const { id } = this.props.match.params;
    const { data: products } = await axios.get("/api/inventories");
    const avail = products.filter(
      (prod) => prod.productId * 1 === id * 1 && prod.status === "available"
    );
    this.setState({ availableProducts: avail, count: 0 });
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
  render() {
    const { addCount, subtractCount } = this;
    const { count } = this.state;
    const { products } = this.props;
    const { id } = this.props.match.params;
    const product = products.find((product) => product.id * 1 === id * 1) || {};
    return (
      <div id="productDetail">
        <h1>Product Detail:</h1>
        <h2> {product.name} </h2>
        <img src={product.imageUrl} />
        <div className="counter">
          <button className="counterButton" onClick={subtractCount}>
            -
          </button>
          <div id="count">{count}</div>
          <button className="counterButton" onClick={addCount}>
            +
          </button>
        </div>
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
