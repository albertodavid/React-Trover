import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Book from './Book'
import Home from './Home'

function Pages() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:id" element={<Book />} />
    </Routes>
  )
}

export default Pages