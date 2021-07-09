import Stock from '../models/stock-model.js'

const createStock = (req, res) => {
  const body = req.body

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a stock'
    })
  }

  const stock = new Stock(body)

  if (!stock) {
    return res.status(400).json({ success: false, error: err })
  }

  stock
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: stock._id,
        message: 'stock created!'
      })
    })
    .catch(error => {
      return res.status(400).json({
        error,
        message: 'stock not created!'
      })
    })
}

const updateStock = async (req, res) => {
  const body = req.body

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a body to update'
    })
  }

  Stock.findOne({ _id: req.params.id }, (err, stock) => {
    if (err) {
      return res.status(404).json({
        err,
        message: 'stock not found!'
      })
    }
    stock.name = body.name
    stock.time = body.time
    stock.rating = body.rating
    stock
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: stock._id,
          message: 'stock updated!'
        })
      })
      .catch(error => {
        return res.status(404).json({
          error,
          message: 'stock not updated!'
        })
      })
  })
}

const deleteStock = async (req, res) => {
  await Stock.findOneAndDelete({ _id: req.params.id }, (err, stock) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }

    if (!stock) {
      return res
        .status(404)
        .json({ success: false, error: 'stock not found' })
    }

    return res.status(200).json({ success: true, data: stock })
  }).catch(err => console.log(err))
}

const getStockById = async (req, res) => {
  await Stock.findOne({ _id: req.params.id }, (err, stock) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }

    if (!stock) {
      return res
        .status(404)
        .json({ success: false, error: 'stock not found' })
    }
    return res.status(200).json({ success: true, data: stock })
  }).catch(err => console.log(err))
}

const getStocks = async (req, res) => {
  await Stock.find({}, (err, stocks) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    if (!stocks.length) {
      return res
        .status(404)
        .json({ success: false, error: 'stock not found' })
    }
    return res.status(200).json({ success: true, data: stocks })
  }).catch(err => console.log(err))
}

export default {
  createStock,
  updateStock,
  deleteStock,
  getStocks,
  getStockById
}
