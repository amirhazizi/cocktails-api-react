import React, { useState, useContext, useEffect } from "react"
import { useCallback } from "react"
import axios from "axios"
const url = "https://www.thecocktaildb.com/api/json/v1/1"
const autoFetch = axios.create({
  baseURL: url,
  headers: { Accept: "application/json" },
})
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("a")
  const [cocktails, setCocktails] = useState([])
  const fentchData = async () => {
    setIsLoading(true)
    try {
      const { data } = await autoFetch(`/search.php?s=${searchTerm}`)
      const { drinks } = data
      if (drinks) {
        const newCocktails = drinks.map((item) => {
          const {
            idDrink,
            strDrink,
            strDrinkThumb,
            strAlcoholic,
            strGlass,
          } = item

          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass,
          }
        })
        setCocktails(newCocktails)
      } else {
        setCocktails([])
      }
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }
  useEffect(() => {
    fentchData()
  }, [searchTerm])
  return (
    <AppContext.Provider value={{ isLoading, setSearchTerm, cocktails }}>
      {children}
    </AppContext.Provider>
  )
}

const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider, useGlobalContext }
