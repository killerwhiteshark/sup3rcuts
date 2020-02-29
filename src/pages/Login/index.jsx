import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Firebase from '../../components/Firebase'

const Login = ({ isLoggedIn, doSetCurrentUser }) => {
  const [inputs, setInputs] = useState({})
  const [isAuth, setAuth] = useState(isLoggedIn);

  const handleChange = e => {
    setInputs({
      ...inputs, [e.target.name]: e.target.value
    })
  }
  const handleFormSubmit = async e => {
    const { email, password } = inputs
    e.preventDefault()
    if (await Firebase.doSignInWithEmailAndPassword(email, password)) {
      doSetCurrentUser({
        email,
      })
      debugger
      setAuth(true);
      debugger
    } else {
      throw new Error('Invalid User email/password or no user exists.')
    }
  }
}
if (isAuth) {
  return <Redirect to='/' />
}
return (
  <>
    <h1>Login</h1>
    <form onSubmit={handleFormSubmit}>
      <input
        name='email'
        onChange={handleChange}
        value={email}
        placeholder='email'
      />
      <input
        name='password'
        onChange={handleChange}
        value={password}
        placeholder='password'
        type='password'
      />
      <button type='submit'>Login</button>
    </form>
  </>
)


export default Login
