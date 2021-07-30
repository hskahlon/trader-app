import React, { useState, useEffect } from 'react'
import axios from 'axios'
const API_KEY = 'JCD13LZ263E4JG1P';
const API_BASE_URL = 'https://www.alphavantage.co/query';

export default function TradeStock(props) {
  const [ticker, setTicker] = useState(props.selectedTicker);
  const [price, setPrice] = useState([]);
  useEffect(() => {
    const getPrice = () => {
      axios.get(`${API_BASE_URL}`, {
        params: {
          function: 'GLOBAL_QUOTE',
          symbol: ticker,
          apikey: API_KEY
        }
      })
        .then(json => {
          setPrice(json.data["Global Quote"]["05. price"]);
          alert(`price: ${price} ticker:${ticker} `);
          // document.getElementById("stock-ticker-name").innerHTML = price;
        })
    }
    getPrice();
  }, [ticker])

  return (
    <div>
      Buying Stock Page
      <h1>hi</h1>
    </div>
  )
}
