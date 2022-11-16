import axios from "axios";

// export const BASE_URL = 'http://localhost:3006/api'
export const BASE_URL = 'https://projectmaplegreen.herokuapp.com/api'

export default axios.create({
    baseURL: BASE_URL
})