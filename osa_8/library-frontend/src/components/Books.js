
import React, { useState, useEffect } from 'react'

const Books = ({ show, books }) => {
  const [filteredBooks, setFilteredBooks] = useState(books)

  if (!books || !show) {
    return null
  }
 
 

  const genres = books.map(book => book.genres[0])
  const splitted = genres.map(genre => genre.split(", "))
  let allGenres = []
  for (let i = 0; i < splitted.length; i++) {
    for (let j = 0; j < splitted[i].length; j++) {
      console.log(splitted[i][j])
      allGenres.push(splitted[i][j])
    }
    
  }
  const uniqueGenres = [...new Set(allGenres)]

// const clickedi = (genre) => {
//   setFilteredBooks(books.filter(book => book.genres.includes(genre)))

// }
  

return (
  <div>
    <h2>books</h2>

    <table>
      <tbody>
        <tr>
          <th>
            title
          </th>
          <th>
            author
          </th>
          <th>
            published
          </th>
        </tr>
        {filteredBooks.map(a =>
          <tr key={a.title}>
            <td>{a.title}</td>
            <td>{a.author.name}</td>
            <td>{a.published}</td>
          </tr>
        )}
      </tbody>
    </table>
    {uniqueGenres.map(genre =>
      <button key={genre} onClick={() => setFilteredBooks(books.filter(book => book.genres[0].includes(genre)))}>{genre}</button>
    )}
    <button onClick={() => setFilteredBooks(books)}>all genres</button>
  </div>
)
}

export default Books