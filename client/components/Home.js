import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { Box, Paper, Typography } from "@mui/material";
import { getHeroText } from "../store";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { username, loadHeroText, isLoggedIn } = props;
  useEffect(() => {
    loadHeroText(" ");
  }, []);
  return (
    <div>
      <div className="homeInfo">
        <Typography
          id="main-heading"
          variant="h1"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          Experience the outdoors
        </Typography>
      </div>
      <Paper sx={{ m: 2, p: 2, mt: 25 }}>
        {isLoggedIn ? (
          <div>
            <h1>Welcome, {username}</h1>
            <Link to={`/products/all`}>
              <Button
                variant="auth-button"
                id="homeButton"
                type="submit"
                endIcon={
                  <div id="iconGroup">
                    <KeyboardArrowRightIcon id="authIcon" />{" "}
                    <KeyboardArrowRightIcon id="authIcon2" />
                  </div>
                }
                fullWidth
              >
                Shop Now
              </Button>
            </Link>
          </div>
        ) : (
          <div>
            <h1>Welcome!</h1>
            <p> Please sign-up or login to continue shopping.</p>
            <Link to={`/login`}>
              <Button
                variant="auth-button"
                id="homeButton"
                type="submit"
                endIcon={
                  <div id="iconGroup">
                    <KeyboardArrowRightIcon id="authIcon" />{" "}
                    <KeyboardArrowRightIcon id="authIcon2" />
                  </div>
                }
                fullWidth
              >
                Login
              </Button>
            </Link>
          </div>
        )}
      </Paper>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
    isLoggedIn: !!state.auth.id,
    auth: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadHeroText(heroHeading) {
      dispatch(getHeroText(heroHeading));
    },
  };
};

export default connect(mapState, mapDispatch)(Home);
