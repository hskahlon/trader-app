import mongoose from 'mongoose'

const Inventory = new mongoose.Schema({
    ticker: { type: String, required: true },
    quantity: { type: String, required: true },
    email: { type: String, required: true }
})

export default mongoose.model('inventory', Inventory)