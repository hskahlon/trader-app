import React, { useState, useEffect, useRef } from "react";
import CryptoDataService from "../../../api/CryptoDataService";

// packages / webapp / src / api / CryptoDataService.js
// packages / webapp / src / pages / Stocks / components / CryptoList.js
import Coin from "./Coin";
function CryptoList() {
  const [crypto, setCrypto] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    retrieveCrypto();
  }, []);
  const retrieveCrypto = () => {
    CryptoDataService.getAll()
      .then((response) => {
        console.log(response.data);
        setCrypto(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const filteredCoins = crypto.filter((crypto) => {
    return crypto.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="coin">
      <div className>
        <h1 className="coin text"> Search a Coin</h1>
        <form className="searchForm">
          <input
            type="text"
            className="coin-search"
            placeholder="Search"
            onChange={handleChange}
          ></input>
        </form>
      </div>
      {filteredCoins.map((crypto) => {
        return (
          <Coin
            key={crypto.id}
            name={crypto.name}
            price={crypto.current_price}
            symbol={crypto.symbol}
            marketcap={crypto.total_volume}
            volume={crypto.market_cap}
            image={crypto.image}
            priceChange={crypto.price_change_percentage_24h}
          />
        );
      })}
    </div>
  );
}
export default CryptoList;
