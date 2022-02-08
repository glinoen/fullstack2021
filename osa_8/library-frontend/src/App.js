import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommendations from './components/Recommendations'

import { gql, useQuery, useApolloClient, useSubscription } from '@apollo/client'

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`


const ALL_BOOKS = gql`
  query ($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre) {
      title
      published
      author {
        name
      }
      genres
      }
  }
  `

const ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`
const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      published
      author {
        name
      }
      genres
    }
  }
`

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const authors = useQuery(ALL_AUTHORS, {
    pollInterval: 2000
  })
  const books = useQuery(ALL_BOOKS, {
    pollInterval: 2000
  })
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      window.alert("Book added")
    }
  })

  if ( authors.loading || books.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <p > {errorMessage} </p>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? 
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommendations')}>recommendations</button>
            <button onClick={() => logout()}>logout</button>
          </>
          :
          <button onClick={() => setPage('login')}>login</button>
        }
      </div>

      <Authors
        authors = { authors.data.allAuthors }
        show={page === 'authors'}
      />

      <Books
        books = { books.data.allBooks }
        show={page === 'books'}
      />

      <NewBook
        bookQuery = {ALL_BOOKS}
        authorQuery = {ALL_AUTHORS}
        show={page === 'add'}
      />

      <Login 
        setToken={setToken}
        setError={setErrorMessage}
        setPage={setPage}
        show={page === 'login'} 
      />

      {token ?
        <Recommendations
          ALL_BOOKS = {ALL_BOOKS}
          ME = {ME}
          show={page === 'recommendations'}
        />

        : null
      }
      
    </div>
  )
}

export default App