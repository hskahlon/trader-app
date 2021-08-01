import React, { useEffect, useState } from 'react';

import axios from 'axios';
import Research from './Research';

import { TextField, Button, Card, makeStyles, CardActionArea, CardActions, CardContent, Typography, GridList } from '@material-ui/core';
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
  const modalState = {
    "1. symbol": 'null',
    "2. name": 'null',
  }
  const [openModal, setOpenModal] = useState(modalState);
  const [modalVisible, setmodalVisible] = useState(false);
  const [input, setInput] = useState([]);
  const [stockMatch, setStockMatch] = useState([]);
  const [filteredMatch, setFilteredMatch] = useState([]);
  const [foundTicker, setfoundTicker] = useState(false);

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

    console.log(input);
  }

  const handleOpenModal = (e) => {
    setOpenModal(e);
    setmodalVisible(true);
  }
  const classes = useStyles();
  return (
    <div className="App">
      <br></br>
      <br></br>
      <div className="search-bar">
        <form noValidate autoComplete="off">
          <TextField id="full-width-text-field" label="Enter Ticker" variant="outlined" onChange={handleSearchStock} style={{ width: "100%" }} />
          {/* <Button variant="contained" color="primary" onClick={handleSearchSubmission}> Search </Button> */}
          <div id="modal-div">
            {modalVisible && <Research id="modal-trade" closeModal={setmodalVisible} getTicker={openModal["1. symbol"]} setName={openModal["2. name"]} />}
          </div>
          <br></br>
          <GridList cols={4}>
          {stockMatch && stockMatch.map((item, index) => (
            <div key={index} style={{ marginLeft: "35%", marginTop: "5px" }}>
              {/* <Card style={{ width: "50%" }} title={`Ticker: ${item["1. symbol"]}`}>
                name: {item["2. name"]}

              </Card> */}
              {/* Conditionally Render Modal if openMOdal is true */}
              {/* {openModal && <Research closeModal={setOpenModal} getTicker={item["1. symbol"]} setName={item["2. name"]} />} */}
              <br></br>

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
                  <Button size="small" variant="contained" color="primary" style={{ width: "100%" }} onClick={() => handleOpenModal(item)} >
                    Research
                  </Button>
                </CardActions>
              </Card>
            </div>
          ))}
        </GridList>
        </form>
      </div>

    </div>
  );
}

export default SearchApp;
