import React, { useEffect, useState } from "react";

import axios from "axios";

import TradeStock from "./components/TradeStock";
import {
  TextField,
  Button,
  Card,
  makeStyles,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
const API_KEY = "5FCSO2LNUN72V90N";
const API_BASE_URL = "https://www.alphavantage.co/query";
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
    "1. symbol": "null",
    "2. name": "null",
  };
  const [openModal, setOpenModal] = useState(modalState);
  const [modalVisible, setmodalVisible] = useState(false);
  const [input, setInput] = useState([]);
  const [stockMatch, setStockMatch] = useState([]);

  useEffect(() => {
    const searchStock = () => {
      axios
        .get(`${API_BASE_URL}`, {
          params: {
            function: "SYMBOL_SEARCH",
            keywords: input,
            apikey: API_KEY,
          },
        })
        .then((json) => {
          if (json.data.Note !== undefined) {
            alert("Slow down Trader, API limit hit retry in 1 minute");
          } else {
            setStockMatch(json.data?.bestMatches);
          }
        });
    };

    const timeOutId = setTimeout(() => {
      if (input) {
        searchStock();
      }
    }, 500);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [input]);

  const handleSearchStock = (e) => {
    const stockSymbolValue = e.target.value;
    setInput(stockSymbolValue);

    console.log(input);
  };

  const handleOpenModal = (e) => {
    setOpenModal(e);
    console.log(e);
    setmodalVisible(true);
  };
  const classes = useStyles();
  return (
    <div className="App">
      <br></br>
      <Typography variant="h2" align="center">
        Welcome to the Trading Floor
      </Typography>
      <br></br>
      <div className="search-bar">
        <form noValidate autoComplete="off">
          {!modalVisible && (
            <TextField
              id="full-width-text-field"
              label="Enter Ticker"
              variant="outlined"
              onChange={handleSearchStock}
              style={{ width: "100%" }}
            />
          )}
          {/* <Button variant="contained" color="primary" onClick={handleSearchSubmission}> Search </Button> */}
          <div id="modal-div">
            {modalVisible && (
              <TradeStock
                id="modal-trade"
                closeModal={setmodalVisible}
                getTicker={openModal["1. symbol"]}
                setName={openModal["2. name"]}
              />
            )}
          </div>
          <br></br>
          {stockMatch &&
            stockMatch.map((item, index) => (
              <div key={index} style={{ marginLeft: "35%", marginTop: "5px" }}>
                {/* <Card style={{ width: "50%" }} title={`Ticker: ${item["1. symbol"]}`}>
                name: {item["2. name"]}

              </Card> */}
                {/* Conditionally Render Modal if openMOdal is true */}
                {/* {openModal && <TradeStock closeModal={setOpenModal} getTicker={item["1. symbol"]} setName={item["2. name"]} />} */}
                <br></br>
                {!modalVisible && (
                  <Card
                    className={classes.root}
                    onClick={() => handleOpenModal(item)}
                  >
                    <CardActionArea>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {item["2. name"]}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          `Ticker: ${item["1. symbol"]}`
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                )}
              </div>
            ))}
        </form>
      </div>
    </div>
  );
};

export default SearchApp;
