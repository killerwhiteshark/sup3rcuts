import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

import Firebase from '../../components/Firebase'

const SignUp = (props) => {
    const [isAuth, setIsAuth] = useState(false);
    const [error, setError] = useState(null);
    const [inputs, setInputs] = useState({});

    const handleChange = e => {
        setInputs({
            ...inputs, [e.target.name]: e.target.value,
        })
    }

    const handleFormSubmit = async e => {
        const { email, passwordOne, userName} = inputs;
        e.preventDefault()
        try {
            await Firebase.doCreateUserWithEmailAndPassword(email, passwordOne)
            props.doSetCurrentUser({
                email,
            })
            const user = await Firebase.auth.currentUser;
            try {
                Firebase.db.collection('users').doc(user.uid).set({
                    'userName': userName
                })
            } catch (error) {
               console.log('failed to db collection',error) 
            }
            setIsAuth(true);
        } catch (error) {
            setError(error)
            setTimeout(() => {
                setError(null);
            }, 3000)
        }
    }

    const isInvalid = inputs.passwordOne !== inputs.passwordTwo || inputs.passwordOne === '' || inputs.email === '' || inputs.username === '';

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
                <button disabled={isInvalid} type='submit'>
                    Submit
        </button>
            </form>
            {error && <div style={{ color: 'red' }}>{error.message}</div>}
        </div>
    )
}

export default SignUp
