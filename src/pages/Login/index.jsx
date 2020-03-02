import React, { useState } from 'react'
import Firebase from '../../components/Firebase'

const Login = () => {
  const [inputs, setInputs] = useState({})
  const [isAuth, setAuth] = useState(false)
  const [noUser, setNoUser] = useState(false)

  const handleChange = e => {
    setInputs({
      ...inputs, [e.target.name]: e.target.value
    })
  }
  const handleFormSubmit = async e => {
    const { email, password } = inputs
    e.preventDefault()
    try {
      await Firebase.doSignInWithEmailAndPassword(email, password)
        .then(() => { setAuth(Firebase.user.logIn);})
        .catch((err) => { console.log(err); setNoUser(true); throw Error });
    } catch (error) {
      setNoUser(true)
      setTimeout(
        () => setNoUser(false), 3000)
    }
  }

  const { email, password } = inputs
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
      {(noUser) ? (<h4 style={{ color: 'red' }}>User Email/Password Invalid or Email does not exist</h4>) : ('')}
    </>
  )
}

export default Login
