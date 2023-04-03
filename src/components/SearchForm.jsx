import React, { useEffect } from "react"
import { useGlobalContext } from "../context"

const SearchForm = () => {
  const { setSearchTerm } = useGlobalContext()
  const searchValue = React.useRef(null)
  const handleKeyPress = () => {
    setSearchTerm(searchValue.current.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
  }
  useEffect(() => {
    searchValue.current.focus()
  }, [])
  return (
    <section className='section search'>
      <form className='search-form' onSubmit={handleSubmit}>
        <div className='form-control'>
          <label htmlFor='name'>search your favorite cocktail</label>
          <input
            type='text'
            id='name'
            onChange={handleKeyPress}
            ref={searchValue}
          />
        </div>
      </form>
    </section>
  )
}

export default SearchForm
