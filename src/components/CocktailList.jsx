import React from "react"
import Cocktail from "./Cocktail"
import Loading from "./Loading"
import { useGlobalContext } from "../context"

const CocktailList = () => {
  const { isLoading, cocktails } = useGlobalContext()
  if (isLoading) {
    return <Loading />
  }
  if (cocktails.length === 0) {
    return <h2 className='section-title'>no cocktails matched your search</h2>
  }
  return (
    <div>
      <h2>cocktail list component</h2>
    </div>
  )
}

export default CocktailList
