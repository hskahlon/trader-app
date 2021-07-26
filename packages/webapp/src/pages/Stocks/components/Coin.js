import React from "react";
import Styles from "./Coin.css";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
const useStyles = makeStyles({
  root: {
    maxWidth: 360,
  },
  media: {
    paddingTop: "56.25%", // 16:9,
  },
});
const Coin = ({
  name,
  price,
  symbol,
  marketcap,
  volume,
  image,
  priceChange,
}) => {
  const classes = useStyles();
  return (
    <div className="coin-card">
      <div className="allCardz">
        <Card className="allCards">
          <CardActionArea className>
            <CardMedia className={classes.media} image={image} title="Crypto" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                MarketCap: ${marketcap} Volume ${volume}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button variant="contained" color="primary">
              Price: ${price}
            </Button>
            <Button variant="contained" color="secondary">
              24hr Change: {priceChange}%
            </Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
};

export default Coin;
