import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Container,
  Button,
  Grid,
  Stack,
  ThemeProvider,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import theme from "./Theme";
import axios from "axios";

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      availableProducts: [],
      count: 0,
    };
    this.addCount = this.addCount.bind(this);
    this.subtractCount = this.subtractCount.bind(this);
  }
  async componentDidMount() {
    const { id } = this.props.match.params;
    const { data: products } = await axios.get("/api/inventories");
    const avail = products.filter(
      (prod) => prod.productId * 1 === id * 1 && prod.status === "available"
    );
    this.setState({ availableProducts: avail, count: 0 });
  }
  addCount = () => {
    let { count } = this.state;
    const { availableProducts } = this.state;
    const max = availableProducts.length;
    if (count === max) {
      throw "We don't have enough stock";
    }
    this.setState({ count: count + 1 });
  };
  subtractCount = () => {
    let { count } = this.state;
    if (count === 0) {
      throw "We can't sell you less than 0!";
    }
    this.setState({ count: count - 1 });
  };
  render() {
    const { addCount, subtractCount } = this;
    const { count } = this.state;
    const { products } = this.props;
    const { id } = this.props.match.params;
    const product = products.find((product) => product.id * 1 === id * 1) || {};
    return (
      <ThemeProvider theme={theme}>
        <div id="productDetail">
          <Grid
            item
            xs={8}
            md={4}
            s={5}
            key={product.id}
            justifyContent="center"
          >
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image={product.imageUrl}
                alt={product.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
              </CardContent>
              <CardActions>
                <Grid container spacing={2} justifyContent="center">
                  <Button className="counterButton" onClick={subtractCount}>
                    -
                  </Button>
                  <div className="counterButton">{count}</div>
                  <Button className="counterButton" onClick={addCount}>
                    +
                  </Button>
                  <Grid item xs={12} lg={6}>
                    <Button fullWidth variant="contained" color="success">
                      Add to Cart
                    </Button>
                  </Grid>
                </Grid>
              </CardActions>
            </Card>
          </Grid>
        </div>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
    heroText: state.hero,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadHeroText(heroHeading){
      dispatch(getHeroText(heroHeading))
    }
  }
}

export default connect(mapStateToProps, mapDispatch)(ProductDetail);
