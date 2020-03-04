import React, { useState } from 'react'
import Firebase from '../../components/Firebase'
import { Link, Redirect } from 'react-router-dom'
import { useEffect } from 'react'

const Login = () => {
  const [inputs, setInputs] = useState({})
  const [noUser, setNoUser] = useState(false)
  const [loggedIn, setLog] = useState(false)
  useEffect(() => {
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

  if (loggedIn) {
    return <Redirect to='/main' />
  }
  const { email, password } = inputs
  return (
    <div className='row'>
      <h1>Login</h1>
      <div className="row">
        <form onSubmit={handleFormSubmit} className="col s12">
          <div className="row">
            <div className="input-field col s6">
              <input
                placeholder='Email'
                name='email'
                onChange={handleChange}
                value={email}
              />
              
            </div>
            <div className="input-field col s6">
              <input
                placeholder='Password'
                name='password'
                onChange={handleChange}
                value={password}
                type='password'
              />
            </div>
          </div>
          <div className="row">
            <button type='submit' className='btn grey darken-2'>Login</button>
          </div>
        </form>
      </div>
      {(noUser) ? (<h4 style={{ color: 'red' }}>User Email/Password Invalid or Email does not exist</h4>) : ('')}
      <div className='row'>
        <h5 className='col md6'>No account? <Link to='/signup'>Sign Up!</Link></h5>
      </div>
    </div>
  )
}

export default Login
