import React, { useState, useContext, useEffect } from "react"
import { useCallback } from "react"
import autoFetch from "./customAxios"
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("a")
  const [cocktails, setCocktails] = useState([])
  const fentchData = useCallback(async () => {
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
  }, [searchTerm])
  useEffect(() => {
    fentchData()
  }, [searchTerm, fentchData])
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
