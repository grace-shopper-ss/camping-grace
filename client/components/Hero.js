import React from "react";
import { connect, useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Container, Paper, Button, Grid, Stack, ThemeProvider, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import theme from './Theme';
import Navbar from './Navbar';
import Drawer from './Drawer';

const Hero = (props) => {
  
  const heroHeading = useSelector((state) => state.hero) || "Default";
  const {pathname} = props.location

  const isHero = pathname === "/home" ? "landing" : "hero";
  
  

  return (    
    <ThemeProvider theme={theme}>
      <div id={isHero}>
      <Drawer />    
      <Typography className="pageHeader" gutterBottom variant="h3" component="div" color="primary.contrastText">
        {heroHeading}
      </Typography>       
      </div>
    </ThemeProvider>    
  );
};

const mapStateToProps = (state) => {
  return {
    heroText: state.heroText,
  };
};

export default withRouter(connect(mapStateToProps)(Hero));