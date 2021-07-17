import { FETCH_ALL, CREATE, DELETE } from "../constants/actionTypes";

const stockReducer = (stocks = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...stocks, action.payload];
    case DELETE:
      return stocks.filter((stocks) => stocks._id !== action.payload);
    default:
      return stocks;
  }
};

export default stockReducer;
