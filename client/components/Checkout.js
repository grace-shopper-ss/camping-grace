import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Paper, Button, Grid, Box, TextField } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {
  getHeroText,
  orderCartItems,
  completeOrder,
  createOrder,
} from "../store";


const Checkout = ({
  auth,
  cart,
  order,
  orderCartItems,
  completeOrder,
  createOrder,
}) => {
  const [name, setName] = useState("");
  const [payment, setPayment] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvv, setCvv] = useState("");

  const handleChangeName = (event) => {
    setName(event.target.value);
  };
  const handleChangePayment = (event) => {
    setPayment(event.target.value);
  };
  const handleChangeExpiration = (event) => {
    setExpiration(event.target.value);
  };
  const handleChangeCvv = (event) => {
    setCvv(event.target.value);
  };

  const checkOut = () => {
    orderCartItems(cart);
    completeOrder(order);
    createOrder(auth);
  };

  return (
    <Paper id="checkoutContainer">
      <h1>Checkout</h1>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1 },
        }}
        noValidate
        autoComplete="off"
        onSubmit={checkOut}
        name={cart}
      >
        <Grid
          container
          spacing={2}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item lg={12}>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <TextField
                  id="name-input"
                  label="Name"
                  value={name}
                  name="name"
                  onChange={handleChangeName}
                  fullWidth
                />
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <TextField
                  id="payment-input"
                  label="Card Number"
                  name="payment"
                  value={payment}
                  onChange={handleChangePayment}
                  type="payment"
                  fullWidth
                />
              </Grid>

              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextField
                  id="expiration-input"
                  label="Expiration"
                  name="expiration"
                  value={expiration}
                  onChange={handleChangeExpiration}
                  type="expiration"
                  fullWidth
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextField
                  id="cvv-input"
                  label="CVV"
                  name="cvv"
                  value={cvv}
                  onChange={handleChangeCvv}
                  type="cvv"
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item lg={12}>
            <Grid item lg={12} md={12} s={12} xs={12}>
              <Link to="/home">
                <Button
                  variant="payment-button"
                  id="submitPayment"
                  type="submit"
                  onClick={checkOut}
                  endIcon={
                    <div id="iconGroup">
                      <KeyboardArrowRightIcon id="authIcon" />{" "}
                      <KeyboardArrowRightIcon id="authIcon2" />
                    </div>
                  }
                  fullWidth
                >
                  Checkout
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    cart: state.cart,
    products: state.products,
    order: state.order,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadHeroText(heroHeading) {
      dispatch(getHeroText(heroHeading));
    },
    orderCartItems: (cart, history) => dispatch(orderCartItems(cart, history)),
    completeOrder: (order) => dispatch(completeOrder(order)),
    createOrder: (auth) => dispatch(createOrder(auth)),
  };
};

export default connect(mapStateToProps, mapDispatch)(Checkout);
