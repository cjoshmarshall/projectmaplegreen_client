import axios from "axios";

export const BASE_URL = 'http://localhost:3006/api'

export default axios.create({
    baseURL: BASE_URL
})