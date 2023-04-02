import React, { useState, useContext, useEffect } from "react"
import { useCallback } from "react"
import axios from "axios"
const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="
const autoFetch = axios.create({
  baseURL: url,
  headers: { Accept: "application/json" },
})
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("a")
  const [cocktails, setCocktails] = useState([])
  return (
    <AppContext.Provider
      value={{ isLoading, searchTerm, setSearchTerm, cocktails }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider, useGlobalContext }
