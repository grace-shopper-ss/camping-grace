import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import { Box, Paper } from '@mui/material';
import { getHeroText } from "../store";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

/**
 * COMPONENT
 */
export const Home = props => {
  const { username, loadHeroText} = props;
  useEffect( () => {
    loadHeroText(' ')
  },[]);
  return (
    <div>      
      <Paper sx={{m: 2, p: 2, mt: 25}}>
        <h1>Welcome, {username}</h1>
        <Link to={`/products/all`}>
          <Button 
            variant="auth-button"
            id="homeButton"
            type="submit"
            endIcon={<div id='iconGroup'><KeyboardArrowRightIcon id="authIcon"/> <KeyboardArrowRightIcon id="authIcon2"/></div>}
            fullWidth
          >Shop Now</Button>
        </Link>
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
  };
};


const mapDispatch = dispatch => {
  return {
    loadHeroText(heroHeading){
      dispatch(getHeroText(heroHeading))
    }
  }
}

export default connect(mapState, mapDispatch)(Home)
