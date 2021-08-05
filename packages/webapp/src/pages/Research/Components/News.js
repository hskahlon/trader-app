// Component to fetch news based on provided ticker, currently not included
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  makeStyles,
} from "@material-ui/core";
const API_BASE_URLS = "https://www.finnhub.io/api/v1/company-news?";
const token = "c3m9jeaad3ic2eudck9g";
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
export default function News({ getTicker }) {
  const [ticker, setTicker] = useState(getTicker);
  const [news, setNews] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1; // months from 1-12.
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    const newDateFrom = year + "-" + month + "-" + day;
    const newDateTo = year + "-" + month + "-" + day;

    const getNews = () => {
      axios
        .get(`${API_BASE_URLS}`, {
          params: {
            symbol: ticker,
            from: newDateFrom,
            to: newDateFrom,
            token: token,
          },
        })
        .then((json) => {
          setNews(json.data);
        });
    };
    getNews();
  }, [ticker]);
  return (
    <div>
      {news &&
        news.map((item, index) => (
          <div key={index} style={{ marginLeft: "35%", marginTop: "5px" }}>
            {/* <Card style={{ width: "50%" }} title={`Ticker: ${item["1. symbol"]}`}>
                name: {item["2. name"]}

              </Card> */}
            {/* Conditionally Render Modal if openMOdal is true */}
            {/* {openModal && <TradeStock closeModal={setOpenModal} getTicker={item["1. symbol"]} setName={item["2. name"]} />} */}
            <br></br>
            <Card className={classes.root}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {item.headline}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    `Ticker: ${item.source}`
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                {/* <Button size="small" variant="contained" color="primary" style={{ width: "100%" }} onClick={() => handleOpenModal(item)} >
                Trade
              </Button> */}
              </CardActions>
            </Card>
          </div>
        ))}
    </div>
  );
}
