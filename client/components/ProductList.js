import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const ProductList = (props) => {
  const products = props.products;
  return (
    <div id="productList">
      <ul>
        {products.map((product) => {
          const linkToProduct = `/products/${product.id}`;
          return (
            <li key={product.id}>
              <Link to={linkToProduct}>{product.name}</Link>
            </li>
          );
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
