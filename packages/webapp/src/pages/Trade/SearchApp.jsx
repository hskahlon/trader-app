import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField, Button, Card, makeStyles, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
// import { Input, Card } from "antd"
const API_KEY = 'JCD13LZ263E4JG1P';
const API_BASE_URL = 'https://www.alphavantage.co/query';
// Define Style for card
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const SearchApp = () => {
  const [input, setInput] = useState([]);
  const [stockMatch, setStockMatch] = useState([]);
  const [filteredMatch, setFilteredMatch] = useState([]);
  // const [price, setPrice] = useState([]);
  const [foundTicker, setfoundTicker] = useState(false);
  // const [ticker, setTicker] = useState("Enter Ticker");
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
          setfoundTicker(true);
          // if (stockMatch && stockMatch[0] && stockMatch[0]['1. symbol']) {
          //   alert("found stocks, setting price")
          //   setfoundTicker(true);
          //   setTicker(stockMatch[0]['1. symbol']);
          //   getPrice();
          // } else {
          //   setfoundTicker(false);
          //   setTicker("Enter Ticker");
          // }
        })
    }
    // const searchStock = (text) => {
    //   const matches = stockMatch.filter((input) => {
    //     const regex = new RegExp(`${text}`, "gi");
    //     return stockMatch[stockMatch[0]['1. symbol']]match(regex)
    //   })
    // }

    // const getPrice = () => {
    //   if (foundTicker) {
    //     axios.get(`${API_BASE_URL}`, {
    //       params: {
    //         function: 'GLOBAL_QUOTE',
    //         symbol: ticker,
    //         apikey: API_KEY
    //       }
    //     })
    //       .then(json => {
    //         if (json.data["Global Quote"] && json.data["Global Quote"]["05. price"]) {
    //           setPrice(json.data["Global Quote"]["05. price"]);
    //           alert(`price: ${price} ticker:${ticker}`);
    //           document.getElementById("stock-ticker-name").innerHTML = price;
    //         }
    //       })
    //   }
    // }

    const timeOutId = setTimeout(() => {
      if (input) {
        searchStock();
      }
    }, 500);

    return () => {
      clearTimeout(timeOutId);
    }
  }, [input])
  useEffect(() => {
    const manipulateArray = () => {
      const arrayOfTickers = [];
      if (stockMatch) {
        // filter out just the ticker of company
        for (let i = 0; i < stockMatch.length; i++) {
          arrayOfTickers.push(stockMatch[i]['1. symbol']);
        }
        setFilteredMatch(arrayOfTickers);
        // alert(arrayOfTickers.length);
      }
    }
    manipulateArray();
  }, [stockMatch]);

  const handleSearchStock = (e) => {
    const stockSymbolValue = e.target.value;
    setInput(stockSymbolValue);

    // if (foundTicker) {
    //   setFormDetail();
    // }

    console.log(input);
  }
  // Here we set the price, and ticker name
  // const setFormDetail = (e) => {
  //   document.getElementById("enterstockticker").innerHTML = ticker;
  // }
  const handleSearchSubmission = (e) => {
    e.preventDefault();
    // getPrice();
    // setResultList(null);
  }
  const classes = useStyles();
  return (
    <div className="App">
      <div className="search-bar">
        <form noValidate autoComplete="off">
          <br></br>
          <TextField id="full-width-text-field" label="Enter Ticker" variant="outlined" onChange={handleSearchStock} style={{ width: "100%" }} />
          <Button variant="contained" color="primary" onClick={handleSearchSubmission}> Search </Button>
          {stockMatch && stockMatch.map((item, index) => (
            <div key={index} style={{ marginLeft: "35%", marginTop: "5px" }}>
              {/* <Card style={{ width: "50%" }} title={`Ticker: ${item["1. symbol"]}`}>
                name: {item["2. name"]}

              </Card> */}
              <Card className={classes.root}>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {item["2. name"]}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      `Ticker: ${item["1. symbol"]}`
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary" style={{ width: "50%" }}>
                    Buy
                  </Button>
                  <Button size="small" color="primary" style={{ width: "50%" }}>
                    Sell
                  </Button>
                </CardActions>
              </Card>
            </div>
          ))}
        </form>
      </div>
      {/* <div className="price-info">
        <h1 id="stock-cost">Cost:</h1>
        <TextField id="outlined-basic" label="Price" variant="outlined" />
      </div>
      <div className="quantity-info">
        <h1>Enter Number of Shares:</h1>
        <TextField id="outlined-basic" label="Total Cost" variant="outlined" disabled />
      </div> */}
    </div>
  );
}

export default SearchApp;
