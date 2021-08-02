// const API_KEY = "DXKIK94IXVCT2Q7Q";

function apiCall(Symbol, API_KEY) {
  const API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${Symbol}&outputsize=compact&apikey=${API_KEY}`;
  return API_CALL;
}

export default apiCall;
