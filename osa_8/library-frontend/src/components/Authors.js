import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'

const EDIT_BIRTHYEAR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`

const Authors = ({ show, authors }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [ editBirthyear ] = useMutation(EDIT_BIRTHYEAR)

  const submit = async (event) => {
    event.preventDefault()
    editBirthyear({ variables: { name, setBornTo: parseInt(born) } })
    setName('')
    setBorn('')
  }

  if (!authors || !show) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <label>
          name
          <select  value={name} onChange={({ target }) => setName(target.value)}>
            {authors.map( (x) => 
              <option key={x.name}>{x.name}</option>
              )
            }
          </select>
        </label>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors