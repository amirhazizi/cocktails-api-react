import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
// import pages
import Home from "./pages/Home"
import About from "./pages/About"
import SingleCocktail from "./pages/SingleCocktail"
import Error from "./pages/Error"
import SharedLayout from "./pages/SharedLayout"
// import components
import Navbar from "./components/Navbar"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='coctails/:coctailID' element={<SingleCocktail />} />
          <Route path='*' element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
