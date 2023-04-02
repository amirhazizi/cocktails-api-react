import React, { useState, useContext, useEffect } from "react"
import { useCallback } from "react"
import axios from "axios"
const url = "https://www.thecocktaildb.com/api/json/v1/1/"
const autoFetch = axios.create({
  baseURL: url,
})
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("a")
  const [cocktails, setCocktails] = useState([])
  const fentchData = async () => {
    setIsLoading(true)
    try {
      const { data } = await autoFetch(`search.php?s=${searchTerm}`)

      if (data?.drinks) {
        const { drinks } = data
        const newCocktails = drinks.map((drink) => {
          const {
            idDrink,
            strDrink,
            strDrinkThumb,
            strAlcoholic,
            strGlass,
          } = drink
          return {
            id: idDrink,
            name: strDrink,
            image,
            strDrinkThumb,
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
      console.log(error.response)
      setIsLoading(false)
    }
  }
  useEffect(() => {
    fentchData()
  }, [])
  useEffect(() => {
    fentchData()
  }, [searchTerm])
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
