import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Badge, withStyles, Grid, TextField, Button, Card, makeStyles, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
const API_KEY = 'JCD13LZ263E4JG1P';
const API_BASE_URL = 'https://www.alphavantage.co/query';
// Define Style for card
const useStyles = makeStyles({
  root: {
    background: '#0a2351',
    color: "white",
    width: '80%',
    border: 0,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  media: {
    height: 140,
  },
});
function createData(name, ratio, value, indicator) {
  return { name, ratio, value, indicator };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function Research({ closeModal, getTicker, setName }) {
  const defaultStats = {
    Description: '',
    PERatio: 0,
    ForwardPE: 0,
    EPS: 0,
    ROA: 0,
    ROE: 0,
    TargetPrice: 0,

  }
  const [ticker, setTicker] = useState(getTicker);
  const [stats, setStats] = useState(defaultStats);
  const [price, setPrice] = useState([]);
  const [stockName, getName] = useState(setName);
  const [shareCount, setShareCount] = useState(0);
  const [cost, setCost] = useState(0);
  useEffect(() => {
    const getStats = () => {
      axios.get(`${API_BASE_URL}`, {
        params: {
          function: 'OVERVIEW',
          symbol: ticker,
          apikey: API_KEY
        }
      })
        .then(json => {
          if (json.data.Note !== undefined) {
            alert("Slow down Trader, Api limit hit retry in 1 minute");
          } else {
            const newStats = {
              Description: json.data.Description,
              PERatio: json.data.PERatio,
              ForwardPE: json.data.ForwardPE,
              EPS: json.data.EPS,
              ROA: json.data.ReturnOnAssetsTTM,
              ROE: json.data.ReturnOnEquityTTM,
              TargetPrice: json.data.AnalystTargetPrice,

            }
            setStats(newStats);
            // PEGRatio > 1 indicates overvalued
          }
          // alert(`price: ${price} ticker:${ticker} `);
          // document.getElementById("stock-ticker-name").innerHTML = price;
        })
    }
    getStats();
  }, [ticker])

  useEffect(() => {
    const updateCost = () => {
      const CurrentCost = price * shareCount;
      setCost(CurrentCost)
    }
    updateCost();
  }, [shareCount])
  // use style for card
  const classes = useStyles();
  const SellButton = withStyles({
    root: {
      background: '#fd5c63',
      borderRadius: 3,
      border: 0,
      color: 'white',
      width: "50%",
      height: 48,
      padding: '0 30px',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    label: {
      textTransform: 'capitalize',
    },
  })(Button);
  const BuyButton = withStyles({
    root: {
      background: "#32de84",
      borderRadius: 3,
      border: 0,
      color: 'white',
      width: "50%",
      height: 48,
      padding: '0 30px',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    label: {
      textTransform: 'capitalize',
    },
  })(Button);
  const CounterButton = withStyles({
    root: {
      background: "#ffffff",
      borderRadius: 3,
      border: 0,
      height: 48,
      color: 'black',
      padding: '0 30px',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      margin: '8px',
    },
    label: {
      textTransform: 'capitalize',
    },
  })(Button);
  const TriggerButton = withStyles({
    root: {
      background: "black",
      borderRadius: 3,
      border: 0,
      height: 48,
      color: 'white',
      padding: '0 30px',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    label: {
      textTransform: 'capitalize',
    },
  })(Button);
  const handleIncrementCount = (e) => {
    const newCount = shareCount + 1
    setShareCount(newCount);
  }
  const handleDecrementCount = (e) => {
    let newCount = shareCount - 1
    if (newCount <= 0) {
      newCount = 0;
    }
    setShareCount(newCount);
  }
  const updateCost = (e) => {
    const CurrentCost = price * shareCount;
    setCost(CurrentCost)
  }
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <br></br>
        <div className="body" >
          <Grid container direction="column" justify="center" alignItems="center" >
            <Card className={classes.root} >
              <CardActionArea>
                <CardContent>
                  <Grid container direction="column" justify="center" alignItems="center" >
                    <Grid item>
                      <Typography gutterBottom variant="h5" component="h2">
                        Key Stats
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography gutterBottom variant="h5" component="h2">
                        {`${stats.Description}`}
                      </Typography>
                    </Grid>

                    <Grid item>
                      {/* Stats */}
                      <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell>{`${stockName}`} Ratio </TableCell>
                              <TableCell align="right">Value</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow>
                              <TableCell align="right">{"Forward PE"}</TableCell>
                              <TableCell align="right">{stats.ForwardPE}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell align="right">{"PE"}</TableCell>
                              <TableCell align="right">{stats.PERatio}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell align="right">{"EPS"}</TableCell>
                              <TableCell align="right">{stats.EPS}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell align="right">{"EPS"}</TableCell>
                              <TableCell align="right">{stats.EPS}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell align="right">{"ROA"}</TableCell>
                              <TableCell align="right">{stats.ROA}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell align="right">{"ROE"}</TableCell>
                              <TableCell align="right">{stats.ROE}</TableCell>
                            </TableRow>
                          </TableBody>

                        </Table>
                      </TableContainer>
                    </Grid>
                  </Grid>
                </CardContent>
              </CardActionArea>
              <CardActions>
              </CardActions>
              <div className="footer">
                <Button size="small" variant="contained" color="secondary" style={{ width: "100%" }} onClick={() => closeModal(false)}> Cancel </Button>
              </div>
            </Card>
          </Grid>
        </div>
      </div>
    </div>
  )
}
