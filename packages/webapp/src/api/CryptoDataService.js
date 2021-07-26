const axios = require("axios");

class CryptoDataService {
  // https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d
  // get all crypto
  getAll() {
    return axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d"
    );
  }
  // get specific crypto
  //   getID(id) {
  //     return http.get(`users?id=${id}`)
  //   }
}

export default new CryptoDataService();
