import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { TextField, Button } from '@material-ui/core';
const API_KEY = 'JCD13LZ263E4JG1P';
const API_BASE_URL = 'https://www.alphavantage.co/query';
const SearchApp = () => {
  const [input, setInput] = useState([]);
  const [stockMatch, setStockMatch] = useState([]);
  useEffect(() => {
    const searchStock = () => {
      axios.get(`${API_BASE_URL}`, {
        params: {
          function: 'SYMBOL_SEARCH',
          keywords: input,
          apikey: API_KEY
        }
      })
        .then(json => {
          setStockMatch(json.data?.bestMatches);
        })
    }
    const timeOutId = setTimeout(() => {
      if (input) {
        searchStock();
      }
    }, 500);

    return () => {
      clearTimeout(timeOutId);
    }
  }, [input])

  const handleSearchStock = (e) => {
    const stockSymbolValue = e.target.value;
    setInput(stockSymbolValue);
    // if (stockMatch) {
    //   alert(stockMatch[0]['1. symbol']);
    // }

    console.log(input);
  }
  // Here we set the price, and ticker name
  const setFormDetail = (e) => {
    document.getElementById("enterstockticker").innerHTML = stockMatch[0]['1. symbol'];
  }
  const handleSearchSubmission = (e) => {
    e.preventDefault();
    setFormDetail();
    // setResultList(null);
  }
  return (
    <div className="App">
      <div className="search-bar">
        <form noValidate autoComplete="off">
          <br></br>
          <TextField id="outlined-basic" label="Enter Ticker" variant="outlined" onChange={handleSearchStock} />
          <Button variant="contained" color="primary" onClick={handleSearchSubmission}> Search </Button>
        </form>
        <h1 id="enterstockticker">enter stock ticker</h1>
      </div>
      <div className="price-info">
        <h1>Cost:</h1>
      </div>
      <div className="quantity-info">
        <h1>Enter Number of Shares:</h1>
      </div>
    </div>
  );
}

export default SearchApp;
