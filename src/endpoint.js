const axios = require("axios").default
const instance = axios.create({
    baseURL: "http://localhost:8080/"
})

export default instance