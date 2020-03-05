import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Firebase from '../../components/Firebase'

const PasswordForgetForm = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null)

  const onSubmit = e => {
    e.preventDefault()
    Firebase.auth.sendPasswordResetEmail(email.email)
    .then(()=>{
      setSuccess('Email sent! Dont forget to check your spam folder.')
    })
    .catch(error => {
        setError(error)
        setTimeout(() => {
          setError(null);
        }, 3000)
      })
  }

  const onChange = e => setEmail(
    { [e.target.name]: e.target.value }
  )

  return (
    <>
      <div className="row">
        <form className="col s12" onSubmit={onSubmit}>
          <div className="row">
            <div className="input-field col s6">
              <input
                name='email'
                onChange={onChange}
                placeholder='Email Address'
              />
            </div>
          </div>
          <div className="row">
            <button type='submit' className='btn grey darken-2'>Reset My Password</button>
          </div>
        </form>
      </div>
      {success && <div className='grey darken-1 col m8'><h5 className='teal-text text-accent-2'>{success}</h5></div>}
      {error && <div className='grey darken-1 col m8'><h5 className='red-text text-accent-2'>{error.message}</h5></div>}
      <div className="row">
      <h5><Link to='/login'>Log in</Link></h5>
      </div>
    </>
  )
}

export default PasswordForgetForm
