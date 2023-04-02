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
    <section className='section'>
      <h2 className='section-title'>cocktails</h2>
      <div className='cocktails-center'>
        {cocktails.map((cocktail) => {
          return <Cocktail key={cocktail.id} {...cocktail} />
        })}
      </div>
    </section>
  )
}

export default CocktailList
