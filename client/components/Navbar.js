import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import theme from "./Theme";
import {
  ThemeProvider,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  AppBar,
  Popover,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import Search from "./Search";

const Navbar = ({ isLoggedIn, handleLogout, cart, products }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElPop, setAnchorElPop] = React.useState(null);

  const open = Boolean(anchorEl);
  const openPop = Boolean(anchorElPop);

  const popId = openPop ? "simple-popover" : undefined;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorElPop(null);
  };

  const handlePopClick = (event) => {
    setAnchorElPop(event.currentTarget);
  };

  const handlePopClose = () => {
    setAnchorElPop(null);
  };

  const categories = products.reduce((acc, product) => {
    if (!acc.includes(product.category)) acc.push(product.category);
    return acc;
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" id="nav" elevation={0}>
              <Search></Search>
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
                  <Link to={`/products/all`}>All Products</Link>
                </MenuItem>
                <MenuItem className="menuText" onClick={handleClose}>
                  <Link to={"/account"}>My account</Link>
                </MenuItem>
                <MenuItem className="menuText" onClick={handleLogout}>
                  Logout
                </MenuItem>
              </Menu>
              {/* End Menu */}
              <Typography
                id="main-heading"
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
              >
                <Link to={"/"}>Grace-Camping</Link>
              </Typography>
              <Typography
                id="shop-heading"
                component="div"
                sx={{ flexGrow: 1 }}
                aria-describedby={popId}
                variant="h6"
                onClick={handlePopClick}
              >
                SHOP
              </Typography>
              {/* <Button
                aria-describedby={popId}
                variant="contained"
                onClick={handlePopClick}
                sx={{ flexGrow: 1 }}
              >
                Open Popover
              </Button> */}
              <Popover
                id={popId}
                open={openPop}
                anchorEl={anchorElPop}
                onClose={handlePopClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <div id="popOverTest">
                  <Typography sx={{ p: 2, width: "100%", height: "100%" }}>
                    The content of the Popover.
                    <ul className="productCategories">
                      <li>
                        <Link to="/products/all">All</Link>
                      </li>
                      {categories.map((category, idx) => {
                        return (
                          <li key={idx}>
                            <Link to={`/products/${category}`}>{category}</Link>
                          </li>
                        );
                      })}
                    </ul>
                  </Typography>
                </div>
              </Popover>
              <Link to="/cart" sx={{ flexGrow: 2 }}>
                <IconButton
                  size="large"
                  aria-label="show count of cart items"
                  color="inherit"
                >
                  <Badge badgeContent={cart.length} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              </Link>

              {isLoggedIn ? (
                <div>
                  <Link to="/account" sx={{ flexGrow: 2 }}>
                    <IconButton size="large" aria-label="user" color="inherit">
                      <AccountCircleIcon />
                    </IconButton>
                  </Link>
                  <Button onClick={handleLogout} color="inherit">
                    Logout
                  </Button>
                </div>
              ) : (
                <div>
                  <Link to="/signup">
                    <Button color="inherit">Sign Up</Button>
                  </Link>
                  <Link to="/login">
                    <Button color="inherit">Login</Button>
                  </Link>
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
    cart: state.cart,
    products: state.products,
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
