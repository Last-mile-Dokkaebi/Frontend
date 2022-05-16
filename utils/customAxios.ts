import axios from 'axios'

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
    ? process.env.BACKEND
    : process.env.BACKEND,
  timeout: 10000,
  headers:{
    'Content-Type' : 'application/json'
  }
})

export default instance;