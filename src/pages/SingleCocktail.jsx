import React from "react"
import Loading from "../components/Loading"
import { useParams, Link } from "react-router-dom"
import autoFetch from "../customAxios"
const url = ""

const SingleCocktail = () => {
  const { cocktailID } = useParams()
  const [isLoading, setIsLoading] = React.useState(true)
  const [cocktail, setCocktail] = React.useState(null)
  React.useEffect(() => {
    setIsLoading(true)
    const getCocktail = async () => {
      try {
        const { data } = await autoFetch(`lookup.php?i=${cocktailID}`)
        if (data?.drinks) {
          const {
            strDrink: name,
            strDrinkThumb: image,
            strAlcoholic: info,
            strCategory: category,
            strGlass: glass,
            strInstructions: instructions,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          } = data.drinks[0]
          const ingredients = [
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          ]
          const newCocktail = {
            name,
            image,
            info,
            category,
            glass,
            instructions,
            ingredients,
          }
          setCocktail(newCocktail)
        } else {
          setCocktail(null)
        }
        setIsLoading(false)
      } catch (error) {
        console.log(error)
        setIsLoading(false)
      }
    }
    getCocktail()
  }, [cocktailID])
  if (isLoading) {
    return <Loading />
  } else {
    const {
      name,
      image,
      info,
      category,
      glass,
      instructions,
      ingredients,
    } = cocktail
    return (
      <section className='section cocktail-section'>
        <Link to='/' className='btn btn-primary'>
          Back Home
        </Link>
        <h2 className='section-title'>{name}</h2>
        <div className='drink'>
          <img src={image} alt={name} />
          <div className='drink-info'>
            <p>
              <span className='drink-data'>name:</span>
              {name}
            </p>
            <p>
              <span className='drink-data'>category:</span>
              {category}
            </p>
            <p>
              <span className='drink-data'>info:</span>
              {info}
            </p>
            <p>
              <span className='drink-data'>glass:</span>
              {glass}
            </p>
            <p>
              <span className='drink-data'>instructions:</span>
              {instructions}
            </p>
            <p>
              <span className='drink-data'>ingredients:</span>
              {ingredients.map((ingredient, index) => {
                return ingredient ? (
                  <span key={index}>{ingredient} </span>
                ) : null
              })}
            </p>
          </div>
        </div>
      </section>
    )
  }
}

export default SingleCocktail
