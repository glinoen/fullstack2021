import React, { useState, useEffect } from 'react'
import { gql, useMutation } from '@apollo/client'

const LOGIN = gql`
  mutation login($username: String!, $password: String! ) {
    login(
      username: $username,
      password: $password,
    ) {
      value
    }
  }
`

const Login = (props, setError, setToken) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
  
    const [ login, result ] = useMutation(LOGIN, {
      onError: (error) => {
        setError(error.graphQLErrors[0].message)
      }
    })

    useEffect(() => {
      if ( result.data ) {
        const token = result.data.login.value
        props.setToken(token)
        localStorage.setItem('fs8exercisetoken', token)
        props.setPage("authors")
      }
    }, [result.data]) // eslint-disable-line
  
    if (!props.show) {
      return null
    }
  
    const submit = async (event) => {
      event.preventDefault()
      login({ variables: { username, password } })  
      setUsername('')
      setPassword('')
    }

  
    return (
      <div>
        <form onSubmit={submit}>
          <div>
            login
            <input
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }
  
  export default Login
  