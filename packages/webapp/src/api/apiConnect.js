import axios from "axios";
const API_KEY = "DXKIK94IXVCT2Q7Q";
const apiConnect = axios.create({
  baseURL: "https://www.alphavantage.co/query",
});

export const getDailyChartForSymbol = (symbol) => {
  return axiosInstance.get("", {
    params: {
      // Fetch daily chart
      function: "TIME_SERIES_DAILY",
      symbol,

      apikey: API_KEY,
    },
  });
};

export default apiConnect;
