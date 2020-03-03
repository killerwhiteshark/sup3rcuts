import React, { useState } from 'react'
import Firebase from '../../components/Firebase'
import { Link, Redirect } from 'react-router-dom'
import { useEffect } from 'react'

const Login = () => {
  const [inputs, setInputs] = useState({})
  const [noUser, setNoUser] = useState(false)
  const [loggedIn, setLog] = useState(false)
  useEffect(()=>{
    setLog(Firebase.user.logIn);
  }, [])
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
        .then(() => { return })
        .catch((err) => { console.log(err); setNoUser(true); throw Error });
        setLog(true);
    } catch (error) {
      setNoUser(true)
      setTimeout(
        () => setNoUser(false), 3000)
    }
  }

if(loggedIn){
  return <Redirect to='/main'/>
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
      <div>
        <h4>No account? Sign Up! <Link exact to='/signup'>Sign Up</Link></h4>
      </div>
    </>
  )
}

export default Login
