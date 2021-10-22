import React from "react";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Paper, Button, Grid, Stack, ThemeProvider, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import theme from './Theme';
import Navbar from './Navbar';

const Hero = (props) => {
  
  const heroHeading = useSelector((state) => state.hero) || "Default";
  

  return (    
    <ThemeProvider theme={theme}>
      <div id="hero">
      <Navbar />    
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

export default connect(mapStateToProps)(Hero);