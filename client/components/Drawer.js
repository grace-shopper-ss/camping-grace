import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import theme from "./Theme";
import Search from "./Search";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
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
  Grid,
} from "@mui/material";

const Drawer = ({ isLoggedIn, handleLogout, cart, products }) => {
  const [state, setState] = React.useState({
    top: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const cgProducts = {
    "Shop All": ["All"],
    Apparel: ["Shirts", "Pants", "Outerwear"],
    Other: ["Accessories", "Gear"],
  };

  const list = (anchor) => (
    <Box
      sx={{
        mt: "5.5em",
        backgroundColor: "#444742",
        color: "#f3f2e8",
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Grid
        container
        spacing={6}
        justifyContent="center"
        // alignItems="center"
        sx={{ mt: "1em" }}
      >
        {Object.keys(cgProducts).map((majCategory) => {
          return (
            <Grid
              item
              xs={12}
              sm={3}
              md={3}
              sx={{ textAlign: "center" }}
              mb="1.5em"
              pt=".1em"
              key={majCategory}
            >
              <h1 className="menuHeading">
                <strong>{majCategory}</strong>
              </h1>
              <List sx={{ textAlign: "center" }}>
                {cgProducts[majCategory].map((text, index) => (
                  <ListItem className="menuListItem" button key={text}>
                    <Link
                      sx={{ textAlign: "center" }}
                      to={`/products/${text.toLowerCase()}`}
                    >
                      <ListItemText
                        sx={{ textAlign: "center" }}
                        variant="menuSubItem"
                        primary={text}
                      />
                    </Link>
                  </ListItem>
                ))}
              </List>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navClass = !!state.top ? "active" : "inactive";
  const isMobile = window.screen.width < 600

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar
            sx={{ zIndex: 1400 }}
            position="relative"
            className={`${navClass}`}
            id="nav"
            elevation={0}
          >
            <Toolbar>
              {isMobile && (
                <div>
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
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                  className={`${navClass}`}
                >
                  <MenuItem className="menuText" onClick={handleClose}>
                    <Link to={`/products/all`}>Shop All</Link>
                  </MenuItem>
                  {isLoggedIn ? (
                    <div>
                      <MenuItem className="menuText" onClick={handleClose}>
                        <Link to="/account" sx={{ flexGrow: 2 }}>
                          My account
                        </Link>
                      </MenuItem>
                      <MenuItem className="menuText" onClick={handleLogout}>
                        Logout
                      </MenuItem>
                    </div>
                  ) : (
                    <MenuItem className="menuText" onClick={handleClose}>
                      <Link to="/signup">
                        Sign Up
                      </Link>
                      <Link to="/login">
                        Login
                      </Link>
                    </MenuItem>
                  )}
                </Menu>
                </div>
              )}
              <Typography
                id="main-heading"
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
              >
                <Link to={"/"}>Grace-Camping</Link>
              </Typography>
              <div style={{ flexGrow: 1 }}>
                {["top"].map((anchor) => (
                  <React.Fragment key={anchor}>
                    <Button
                      sx={{ flexGrow: 1 }}
                      color="inherit"
                      onClick={toggleDrawer(anchor, true)}
                    >
                      Shop
                    </Button>
                    <SwipeableDrawer
                      anchor={anchor}
                      open={state["top"]}
                      onClose={toggleDrawer(anchor, false)}
                      onOpen={toggleDrawer(anchor, true)}
                      sx={{ top: "relative" }}
                    >
                      {list(anchor)}
                    </SwipeableDrawer>
                  </React.Fragment>
                ))}
              </div>
              <Search sx={{ flexGrow: 2 }}></Search>
              <Link to="/cart" sx={{ flexGrow: 2 }}>
                <IconButton
                  size="large"
                  aria-label="show count of cart items"
                  color="inherit"
                >
                  <Badge badgeContent={cart.length} color="error">
                    <ShoppingCartIcon className={`${navClass}`} />
                  </Badge>
                </IconButton>
              </Link>

              {isLoggedIn ? (
                <div>
                  <Link to="/account" sx={{ flexGrow: 2 }}>
                    <IconButton size="large" aria-label="user" color="inherit">
                      <AccountCircleIcon className={`${navClass}`} />
                    </IconButton>
                  </Link>
                  <Button
                    className={`${navClass}`}
                    onClick={handleLogout}
                    color="inherit"
                  >
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

export default connect(mapState, mapDispatch)(Drawer);
