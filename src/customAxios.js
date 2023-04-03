import axios from "axios"
const url = "https://www.thecocktaildb.com/api/json/v1/1"
const autoFetch = axios.create({
  baseURL: url,
  headers: { Accept: "application/json" },
})
export default autoFetch
