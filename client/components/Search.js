import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import theme from "./Theme";
import { ThemeProvider, Autocomplete, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Search = ({ products, history, status }) => {
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setOptions(products);
  }, [products]);

  return (
    <ThemeProvider theme={theme}>
      <div className="search" style={{ display: "flex" }}>
        
        <Autocomplete
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            window.location.href = `/products/${newValue.category}/${newValue.id}`;
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
            <TextField {...params} label={<SearchIcon className={`${status}`} size="large" color="inherit" sx={{m:'-1em 2 2 2', p:'0'}}/>} className="search-options" />
          )}
        />
      </div>
    </ThemeProvider>
  );
};

const mapState = (state) => {
  return {
    products: state.products,
  };
};

export default connect(mapState)(Search);
