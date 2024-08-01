import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './user/Layout'
import { Layout as AdminLayout } from './admin/Layout'
import { Home } from './user/Home'
import { Home as AdminHome } from './admin/Home'
import { Login } from '../sessions/Login'
import { Shifts } from '../admin/shifts/Shifts'
import { Availabilities } from '../user/availabilities/Availabilities'
import { Confirm } from '../admin/shifts/Confirm'

export const Root = () => {
  const [user, setUser] = useState(false)

  useEffect(() => {
    const authHeaders = localStorage.getItem('authHeaders');
    if (authHeaders && !user) {
      setUser(JSON.parse(authHeaders));
    }
  }, [user]);

  return (
    <>
      {
        user.role === 'user' ? (
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Layout setUser={setUser} user={user}></Layout>}>
                <Route index element={<Login setUser={setUser} user={user}></Login>}></Route>
                <Route path='/login' element={<Login setUser={setUser} user={user}></Login>}></Route>
                <Route path='/services' element={<Home user={user}></Home>}></Route>
                <Route path='/services/:id/availabilities' element={<Availabilities user={user}></Availabilities>}></Route>
              </Route>
            </Routes>
          </BrowserRouter>
        ) : user.role === 'admin' ? (
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<AdminLayout setUser={setUser} user={user}></AdminLayout>}>
                <Route index element={<Login setUser={setUser} user={user}></Login>}></Route>
                <Route path='/login' element={<Login setUser={setUser} user={user}></Login>}></Route>
                <Route path='/services' element={<AdminHome user={user}></AdminHome>}></Route>
                <Route path='/services/:id/shifts' element={<Shifts user={user}></Shifts>}></Route>
                <Route path='/services/:serviceId/shifts/:id' element={<Confirm user={user}></Confirm>}></Route>
              </Route>
            </Routes>
          </BrowserRouter>
        ) : (
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Layout setUser={setUser} user={user}></Layout>}>
                <Route index element={<Login setUser={setUser} user={user}></Login>}></Route>
                <Route path='/login' element={<Login setUser={setUser} user={user}></Login>}></Route>
              </Route>
            </Routes>
          </BrowserRouter>
        )
      }
    </>
  )
}
