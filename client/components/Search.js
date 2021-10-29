import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import theme from "./Theme";
import { ThemeProvider, Autocomplete, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Search = ({ products }) => {
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const options = products.map((option) => {
      const firstLetter = option.name[0].toUpperCase();
      return {
        firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
        ...option,
      };
    });
    setOptions(options);
  }, [products]);

  return (
    <ThemeProvider theme={theme}>
      <div className="search" style={{ display: "flex" }}>
        <SearchIcon size="large" color="inherit" />
        <Autocomplete
          value={value}
          onChange={(event, newValue) => {
            const product = products.find((p) => p.name === newValue);
            setValue(newValue);
            window.location.href = `/products/${product.category}/${product.id}`;
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          id="products-search"
          options={options.sort((a, b) => (a.category > b.category ? 1 : -1))}
          groupBy={(option) => {
            const cats = option.category.split(" ");
            const catsProper = cats.map(
              (cat) => cat.charAt(0).toUpperCase() + cat.slice(1)
            );
            return catsProper.join(" ");
          }}
          getOptionLabel={(option) => option.name}
          sx={{ width: 200 }}
          renderInput={(params) => (
            <TextField {...params} label="" className="search-options" />
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
