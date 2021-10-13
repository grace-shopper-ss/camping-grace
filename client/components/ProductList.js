import React from "react";
import { connect } from "react-redux";

const ProductList = (props) => {
  const products = props.products;
  return (
    <div id="productList">
      <ul>
        {products.map((product) => {
          return <li key={product.id}>{product.name}</li>;
        })}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

export default connect(mapStateToProps)(ProductList);
