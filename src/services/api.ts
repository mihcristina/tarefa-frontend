import axios from 'axios'

const api = axios.create({
    baseURL: 'https://todolist-backend-iwq2.onrender.com'
})

export default api;