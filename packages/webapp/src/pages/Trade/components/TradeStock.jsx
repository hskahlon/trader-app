import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  withStyles,
  Grid,
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
    background: "#0a2351",
    color: "white",
    width: "80%",
    border: 0,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
  media: {
    height: 140,
  },
});

export default function TradeStock({ closeModal, getTicker, setName }) {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [ticker, setTicker] = useState(getTicker);
  const [price, setPrice] = useState([]);
  const [stockName, getName] = useState(setName);
  const [shareCount, setShareCount] = useState(0);
  const [cost, setCost] = useState(0);
  const [gotPrice, setGotPrice] = useState(false);
  useEffect(() => {
    const getPrice = () => {
      if (!gotPrice) {
        axios
          .get(`${API_BASE_URL}`, {
            params: {
              function: "GLOBAL_QUOTE",
              symbol: ticker,
              apikey: API_KEY,
            },
          })
          .then((json) => {
            if (json.data.Note !== undefined) {
              alert("Slow down Trader, Api limit hit retry in 1 minute");
              closeModal(false);
            } else {
              setGotPrice(true);
              setPrice(json.data["Global Quote"]["05. price"]);
              console.log("set price");
            }
            // alert(`price: ${price} ticker:${ticker} `);
            // document.getElementById("stock-ticker-name").innerHTML = price;
          });
      }
    };
    getPrice();
  }, [ticker]);

  useEffect(() => {
    const updateCost = () => {
      const CurrentCost = price * shareCount;
      setCost(CurrentCost);
    };
    updateCost();
  }, [shareCount]);

  const handleBuy = (e) => {
    axios
      .post("http://34.127.9.86:5000/inventory/addInventory", {
        stockName: stockName,
        ticker: ticker,
        quantity: shareCount,
        email: user?.result.email,
        name: user?.result.name,
      })
      .then(
        (res) => {
          console.log(res);
          alert(res.data);
          window.location.reload(false);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const handleSell = (e) => {
    axios
      .post("http://34.127.9.86:5000/inventory/sellInventory", {
        stockName: stockName,
        ticker: ticker,
        quantity: shareCount,
        email: user?.result.email,
        name: user?.result.name,
      })
      .then(
        (res) => {
          console.log(res);
          alert(res.data);
          window.location.reload(false);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  // use style for card
  const classes = useStyles();
  const SellButton = withStyles({
    root: {
      background: "#fd5c63",
      borderRadius: 3,
      border: 0,
      color: "white",
      width: "50%",
      height: 48,
      padding: "0 30px",
      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    },
    label: {
      textTransform: "capitalize",
    },
  })(Button);
  const BuyButton = withStyles({
    root: {
      background: "#32de84",
      borderRadius: 3,
      border: 0,
      color: "white",
      width: "50%",
      height: 48,
      padding: "0 30px",
      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    },
    label: {
      textTransform: "capitalize",
    },
  })(Button);
  const CounterButton = withStyles({
    root: {
      background: "#ffffff",
      borderRadius: 3,
      border: 0,
      height: 48,
      color: "black",
      padding: "0 30px",
      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
      margin: "8px",
    },
    label: {
      textTransform: "capitalize",
    },
  })(Button);

  const handleIncrementCount = (e) => {
    if (gotPrice) {
      const newCount = shareCount + 1;
      setShareCount(newCount);
    }
  };
  const handleDecrementCount = (e) => {
    if (gotPrice) {
      let newCount = shareCount - 1;
      if (newCount <= 0) {
        newCount = 0;
      }
      setShareCount(newCount);
    }
  };
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <br></br>
        <div className="body">
          {gotPrice && (
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Card className={classes.root}>
                <CardActionArea>
                  <CardContent>
                    <Grid
                      container
                      direction="column"
                      justify="center"
                      alignItems="center"
                    >
                      <Grid item>
                        <Typography gutterBottom variant="h5" component="h2">
                          Trade Stock
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography gutterBottom variant="h5" component="h2">
                          {`${stockName}`}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography gutterBottom variant="h5" component="h2">
                          Ticker: ${ticker}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography gutterBottom variant="h5" component="h2">
                          Price: ${price}
                        </Typography>
                      </Grid>
                      <Grid item>
                        {/* Counter */}
                        <Button
                          variant="contained"
                          onClick={() => handleDecrementCount(shareCount)}
                        >
                          {" "}
                          -{" "}
                        </Button>
                        <CounterButton variant="contained">
                          {shareCount}
                        </CounterButton>
                        <Button
                          variant="contained"
                          onClick={() => handleIncrementCount(shareCount)}
                        >
                          {" "}
                          +{" "}
                        </Button>
                      </Grid>
                      <Grid item>
                        {/* Counter */}
                        <CounterButton variant="contained">
                          ${cost}
                        </CounterButton>
                      </Grid>
                    </Grid>
                  </CardContent>
                </CardActionArea>
                <CardActions></CardActions>
                <div className="footer">
                  <Button
                    style={{ width: "100%", color: "green" }}
                    onClick={() => handleBuy()}
                  >
                    BUY
                  </Button>

                  <Button
                    style={{ width: "100%", color: "red" }}
                    onClick={() => handleSell()}
                  >
                    {" "}
                    Sell
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    color="secondary"
                    style={{ width: "100%" }}
                    onClick={() => window.location.reload(true)}
                  >
                    {" "}
                    Cancel{" "}
                  </Button>
                </div>
              </Card>
            </Grid>
          )}
        </div>
      </div>
    </div>
  );
}
