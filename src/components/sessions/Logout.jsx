import axios from '../../Axios';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const Logout = ({ setUser, user }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.delete('/auth/sign_out', {
        headers: user
      })

      if (response.status === 200) {
        localStorage.removeItem('authHeaders');
        setUser(false)
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Link className='nav-link' onClick={handleLogout}>Logout</Link>
  )
}
