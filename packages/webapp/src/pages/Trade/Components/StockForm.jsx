import React from 'react'
import { useForm } from "react-cool-form";
export default function StockForm() {
  const FormField = () => (
    <div className="input-container">
      <label>Enter Stock Ticker:  </label>
      <input id="stock" name="stock" placeholder="TSLA" /> <br></br>
      <label>Price:  </label>
      <input id="price" name="price" /> <br></br>
      <label>Enter Quantity:  </label>
      <input id="quantity" name="quantity" /> <br></br>
      <label>Total:  </label>
      <input id="total" name="total" /> <br></br>
    </div>
  )
  // create a form for buying and selling
  return (
    <div>
      <form>
        <FormField />
        <input type="Submit" placeholder="Buy Stock" />
      </form>
    </div>
  )
}
