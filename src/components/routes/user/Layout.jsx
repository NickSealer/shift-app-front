import React from 'react'
import logo from '/vite.svg'
import { NavLink, Outlet } from 'react-router-dom'
import { Logout } from '../../sessions/Logout'

export const Layout = ({ setUser, user }) => {
  return (
    <div>
      <nav className='navbar navbar-expand-lg'>
        <div className='container-fluid'>
          <a className='navbar-brand'>
            <img src={logo} className='d-inline-block align-text-top App-logo' alt='logo' style={{ width: 35 }} />
          </a>
          <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNavDropdown' aria-controls='navbarNavDropdown' aria-expanded='false' aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarNavDropdown'>
            <ul className='navbar-nav'>
              {user &&
                <>
                  <li className='nav-item'>
                    <NavLink to='/services' className='nav-link' title='home'>Home</NavLink>
                  </li>
                  <li className='nav-item'>
                    <Logout setUser={setUser} user={user}></Logout>
                  </li>
                  <li className='nav-item'>
                    <span className='nav-link disabled'>{user.uid}</span>
                  </li>
                </>
              }
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  )
}
