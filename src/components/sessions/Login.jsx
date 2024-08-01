import { useNavigate } from 'react-router-dom';
import axios from '../../Axios';
import React, { useRef, useState } from 'react'

export const Login = ({ setUser, user }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const emailRef = useRef('email');
  const passwordRef = useRef('password');
  const navigate = useNavigate()

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const highlightErrors = (color) => {
    emailRef.current.style.borderColor = color;
    passwordRef.current.style.borderColor = color;
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/auth/sign_in', {
        email: emailRef.current.value,
        password: passwordRef.current.value
      })

      if (response.status === 200) {
        const authHeaders = {
          'access-token': response.headers['access-token'],
          'token-type': response.headers['token-type'],
          'client': response.headers['client'],
          'expiry': response.headers['expiry'],
          'uid': response.headers['uid'],
          'role': response.data.data.role
        };

        localStorage.setItem('authHeaders', JSON.stringify(authHeaders));
        setUser(authHeaders)
        navigate('/services');
      }

      highlightErrors('#dee2e6')
    } catch (error) {
      highlightErrors('red');
      console.error(error);
    }
  }

  return (
    <>
      <div className='container py-3'>
        {!user ? (
          <form className='text-center' onSubmit={e => handleLogin(e)}>
            <h2 className='mb-5'>Login</h2>
            <div className='mb-3'>
              <label htmlFor='email' className='form-label'>Email</label>
              <input onChange={e => handleEmail(e)} id='email' name='email' ref={emailRef} type='email' className='form-control' />
              <div className='form-text'>We'll never share your email with anyone else.</div>
            </div>
            <div className='mb-3'>
              <label htmlFor='password' className='form-label'>Password</label>
              <input onChange={e => handlePassword(e)} id='password' name='password' ref={passwordRef} type='password' className='form-control' />
            </div>
            <div className='mb-3'>
              <button type='submit' className='btn btn-success'>Login</button>
            </div>
          </form>
        ) : (
          <div className='alert alert-primary text-center' role='alert'>
            You are already logged in!
          </div>
        )}
      </div>
    </>
  )
}
