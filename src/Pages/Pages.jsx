import React from 'react'
import {Route, Routes} from 'react-router-dom'
import AddBook from './AddBook'
import Biblio from './Biblio'
import Book from './Book'
import Home from './Home'

function Pages() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:id" element={<Book />} />
        <Route path="/biblio" element={<Biblio />} />
        <Route path="/add" element={<AddBook />} />
    </Routes>
  )
}

export default Pages