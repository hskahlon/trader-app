import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
})

export const insertStock = data => api.post(`/stock`, data)
export const getAllStocks = () => api.get(`/stocks`)
export const updateStockById = (id, data) => api.put(`/stock/${id}`, data)
export const deleteStockById = id => api.delete(`/stock/${id}`)
export const getStockById = id => api.get(`/stock/${id}`)

const apis = {
    insertStock,
    getAllStocks,
    updateStockById,
    deleteStockById,
    getStockById,
}

export default apis