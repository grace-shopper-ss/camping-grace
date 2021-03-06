import React, { useEffect } from "react";
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
} from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import theme from "./Theme";
import { getHeroText } from "../store";

const ProductList = (props) => {
  const [focusEl, setFocusEl] = React.useState(null);
  const [displayedProducts, setDisplayedProducts] = React.useState([]);
  const visible = Boolean(focusEl);
  const handleFocus = (event) => {
    setFocusEl(event.currentTarget);
  };
  const products = useSelector((state) => state.products) || [];
  const { category } = props.match.params;

  const { loadHeroText } = props;

  useEffect(() => {
    if (category === "all") {
      loadHeroText("All Products");
      setDisplayedProducts(products);
    } else {
      loadHeroText(category.charAt(0).toUpperCase() + category.slice(1));
      const categoryProducts = products.filter((p) => p.category === category);
      setDisplayedProducts(categoryProducts);
    }
  }, [products, category]);

  return (
    <div>
      <Paper className="paperContainer" elevation={24}>
        <ThemeProvider theme={theme}>
          <div id="productList">
            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              {displayedProducts.map((product) => {
                const linkToProduct = `/products/${product.category}/${product.id}`;
                return (
                  <Grid item lg={3} md={4} s={6} xs={8} key={product.id}>
                    <Card
                      className="transparent cardContainer"
                      elevation={0}
                      sx={{ maxWidth: 550 }}
                      onMouseEnter={handleFocus}
                    >
                      <CardContent
                        className="cardImageContainer cardImage"
                        style={{
                          backgroundImage:
                            `url(` + `/${product.imageUrl}` + `)`,
                        }}
                      >
                        <Grid
                          container
                          spacing={0}
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Grid item lg={7} md={7}>
                            <Link to={linkToProduct}>
                              <Button
                                className="cta-alt"
                                fullWidth
                                variant="cta-alt"
                              >
                                See Details
                              </Button>
                            </Link>
                          </Grid>
                        </Grid>
                      </CardContent>
                      <CardActions>
                        <Grid container spacing={0} justifyContent="center">
                          <Grid item lg={8}>
                            <Typography
                              className="cardHeading"
                              gutterBottom
                              variant="h6"
                              component="div"
                              color="primary"
                            >
                              {product.name}
                            </Typography>
                          </Grid>
                          <Grid className="priceText" item xs={12} lg={6}>
                            <span>
                              <Typography
                                className="cardHeading"
                                color="alternateTextColor"
                              >
                                {" "}
                                <LocalOfferIcon className="tag" /> $
                                {product.price}{" "}
                              </Typography>
                            </span>
                          </Grid>
                        </Grid>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </div>
        </ThemeProvider>
      </Paper>
    </div>
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

export default connect(mapStateToProps, mapDispatch)(ProductList);
