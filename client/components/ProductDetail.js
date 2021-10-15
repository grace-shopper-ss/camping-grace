import React from "react";
import { connect } from "react-redux";

const ProductDetail = (props) => {
  const { products } = props;
  const { id } = props.match.params;
  const product = products.find((product) => product.id * 1 === id * 1) || {};
  
  return (
    <div id="productDetail">        
      <h1>Product Detail:</h1>
      <h2> {product.name} </h2>
      <p>Id: {product.id}</p>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

export default connect(mapStateToProps)(ProductDetail);