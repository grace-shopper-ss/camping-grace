import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import theme from './Theme';
import { ThemeProvider, Box, Toolbar, Typography, Button, IconButton, Menu, MenuItem, AppBar } from '@mui/material';
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';

const Navbar = ({ isLoggedIn, handleLogout }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <ThemeProvider theme={theme}>  
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" id="nav" elevation={0}>
            <Toolbar>
              <IconButton
                id="basic-button"
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                aria-controls="basic-menu"
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <MenuIcon />
              </IconButton>
                {/* Start Menu */}
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem className="menuText" onClick={handleClose}>
                    <Link to={`/products`}>All Products</Link>
                  </MenuItem>
                  <MenuItem className="menuText" onClick={handleClose}>My account</MenuItem>
                  <MenuItem className="menuText" onClick={handleLogout}>Logout</MenuItem>
                </Menu>
                {/* End Menu */}
              <Typography id="main-heading" variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link to={'/'}>
                  Grace-Camping
                </Link>
              </Typography>
              <Link to="/cart" sx={{ flexGrow: 2 }}>
                <IconButton size="large" aria-label="show 4 cart items" color="inherit">
                  <Badge badgeContent={4} color="error">                    
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              </Link>
              
              {isLoggedIn ? (
                <Button onClick={handleLogout} color="inherit">Logout</Button>                
              ) : (
                <div>
                  <Link to="/signup"><Button color="inherit">Sign Up</Button></Link>
                  <Link to="/login"><Button color="inherit">Login</Button></Link>
                </div>
              )}
            </Toolbar>
          </AppBar>
        </Box>                
      </div>
    </ThemeProvider>
  );
};
/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleLogout() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
