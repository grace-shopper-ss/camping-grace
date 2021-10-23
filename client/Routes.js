import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import Cart from "./components/Cart";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import { me, getProducts, getCart, setOrder } from "./store";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    const { loadInitialData, getProducts, auth, setOrder } =
      this.props;
    loadInitialData();
    getProducts();
    setOrder(auth.id);
  }
  componentDidUpdate(prevProps) {
    const { auth, order, setOrder, getCart } = this.props
    if (auth.id !== prevProps.auth.id) {
      setOrder(auth.id);
    }
    if (order.id !== prevProps.order.id) {
      getCart(order);
    }
  }
  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route exact path="/login">
              {<Redirect to="/home" />}
            </Route>
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/products" component={ProductList} />
            <Route path="/products/:id" component={ProductDetail} />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route exact path="/">
              {<Redirect to="/home" />}
            </Route>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/products" component={ProductList} />
            <Route exact path="/products/:id" component={ProductDetail} />
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    auth: state.auth,
    order: state.order,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
    getProducts: () => dispatch(getProducts()),
    getCart: (id) => dispatch(getCart(id)),
    setOrder: (id) => dispatch(setOrder(id)),
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
