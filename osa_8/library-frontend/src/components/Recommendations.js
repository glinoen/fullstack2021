import React from 'react'
import { useQuery } from '@apollo/client'


const Recommendations = ({ show, ALL_BOOKS, ME }) => {
  const user = useQuery(ME)
  const favoriteGenre = user.data?.me.favoriteGenre
  const { loading, error, data } = useQuery(ALL_BOOKS, {
    variables: { genre: favoriteGenre },
  })
  const books = data?.allBooks
  console.log(books)

  if (!show) return null

  if (loading) return <div>loading...</div>
  if (error) return `${error}`

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre: {favoriteGenre}
      </p>
      {books.length > 0 ? (
        <table>
          <tbody>
            <tr>
              <th>title</th>
              <th>author</th>
              <th>published</th>
            </tr>
            {books.map((author) => (
              <tr key={author.title}>
                <td>{author.title}</td>
                <td>{author.author.name}</td>
                <td>{author.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>no books in your favorite genre</p>
      )}
    </div>
  )
}

export default Recommendations