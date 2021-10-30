import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Paper,
  Button,
  Grid,
  ThemeProvider,
  Card,
  CardActions,
  CardContent,
  Typography,
  TextField,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import theme from "./Theme";
import { getHeroText } from "../store";

const Checkout = (props) => {
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

  return (
    <Paper id="checkoutContainer">
      <h1>Checkout</h1>
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
            <Button
              variant="payment-button"
              id="submitPayment"
              type="submit"
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
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadHeroText(heroHeading) {
      dispatch(getHeroText(heroHeading));
    },
  };
};

export default connect(mapStateToProps, mapDispatch)(Checkout);
