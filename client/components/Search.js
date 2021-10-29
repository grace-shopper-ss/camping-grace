import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import theme from "./Theme";
import { ThemeProvider, Autocomplete, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Search = ({ products, history }) => {
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const options = products.map((p) => p.name);

  return (
    <ThemeProvider theme={theme}>
      <div sx={{ flex: true }}>
        <SearchIcon></SearchIcon>
        <Autocomplete
          value={value}
          onChange={(event, newValue) => {
            const product = products.find((p) => p.name === newValue);
            setValue(newValue);
            window.location.href=`/products/${product.category}/${product.id}`;
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          id="controllable-states-demo"
          options={options}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="search"/>
          )}
        />
      </div>
    </ThemeProvider>
  );
};

const mapState = (state) => {
  return {
    products: state.products,
    history: state.history,
  };
};

export default connect(mapState)(Search);
