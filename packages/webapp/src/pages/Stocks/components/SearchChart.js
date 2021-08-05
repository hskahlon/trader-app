import React, { useEffect, useState } from "react";

import axios from "axios";

import {
  TextField,
  Card,
  makeStyles,
  CardActionArea,
  CardContent,
  Typography,
  Grid,
} from "@material-ui/core";
import Chart from "./chart";
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

const SearchChart = () => {
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
  };

  const handleOpenModal = (e) => {
    console.log("open modal");
    setOpenModal(e);
    setmodalVisible(true);
  };
  const classes = useStyles();
  return (
    <div className="App">
      <br></br>
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
          <div id="modal-div">
            {modalVisible && (
              <Chart
                id="modal-trade"
                closeModal={setmodalVisible}
                getTicker={openModal["1. symbol"]}
                setName={openModal["2. name"]}
              />
            )}
          </div>
          <br></br>
          {!modalVisible && (
            <Grid container>
              {stockMatch &&
                stockMatch.map((item, index) => (
                  <Grid item key={index} xs={4}>
                    <div key={index}>
                      <br></br>
                      <Card className={classes.root}>
                        <CardActionArea>
                          <CardContent onClick={() => handleOpenModal(item)}>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                            >
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
                    </div>
                  </Grid>
                ))}
            </Grid>
          )}
        </form>
      </div>
    </div>
  );
};

export default SearchChart;
