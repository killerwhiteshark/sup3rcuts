import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'

import Firebase from '../../components/Firebase'

const SignUp = (props) => {
    const [isAuth, setIsAuth] = useState(false);
    const [error, setError] = useState(null);
    const [inputs, setInputs] = useState({ userName: '' });
    const [userNameValid, setUserName] = useState(false)

    const handleChange = e => {
        setInputs({
            ...inputs, [e.target.name]: e.target.value,
        })
    }

    const handleFocus = async e => {
        if (e.target.value === '') {
            return
        }
        if (await Firebase.findUser(inputs.userName)) {
            debugger
            setInputs({
                userName: ''
            })
            setError({ message: 'Username already exist, please choose another.' })
            setTimeout(() => {
                setError(null);
            }, 3000)
        } else {
            setUserName(true)
            return true
        }
    }

    const handleFormSubmit = e => {
        const { email, passwordOne, userName, firstName, lastName } = inputs;
        e.preventDefault()
        Firebase.auth.createUserWithEmailAndPassword(email, passwordOne)
            .then(async () => {
                await Firebase.db.collection('users').doc(Firebase.auth.currentUser.uid).set({
                    userName,
                    firstName,
                    lastName,
                    email
                });
                props.doSetCurrentUser({
                    email,
                })
                setIsAuth(true);
            })
            .catch((error) => {
                setError(error)
                setTimeout(() => {
                    setError(null);
                }, 3000)
            })
    }

    const isInvalid = inputs.passwordOne !== inputs.passwordTwo || inputs.passwordOne === '' || inputs.email === '' || inputs.userName === '' || !userNameValid;

    if (isAuth) {
        return <Redirect to='/' />
    }

    return (
        <div>
            <h1>Sign up</h1>
            <form onSubmit={handleFormSubmit}>
                <input
                    placeholder='Username'
                    name='userName'
                    onChange={handleChange}
                    onBlur={handleFocus}
                    value={inputs.userName}
                />
                <input
                    placeholder="First Name"
                    name='firstName'
                    onChange={handleChange}
                />
                <input
                    placeholder="Last Name"
                    name='lastName'
                    onChange={handleChange}
                />
                <input
                    placeholder='Email'
                    name='email'
                    onChange={handleChange}
                />
                <input
                    placeholder='Password'
                    type='password'
                    name='passwordOne'
                    onChange={handleChange}
                />
                <input
                    placeholder='Confirm password'
                    type='password'
                    name='passwordTwo'
                    onChange={handleChange}
                />
                <button disabled={isInvalid} className='btn grey darken-2' type='submit'>
                    Submit
        </button>
            </form>
            {error && <div style={{ color: 'blue' }}>{error.message}</div>}
            <div>
                <h4>Already have an account? <Link to='/login'>Login</Link></h4>
            </div>
        </div>
    )
}

export default SignUp

