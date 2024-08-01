import React from 'react'
import { NotFound } from '../NotFound'
import { Services } from '../../user/services/Services'

export const Home = ({ user }) => {
  return (
    <>
      {
        user ? (
          <Services user={user}></Services>
        ) : (
          <NotFound></NotFound>
        )
      }
    </>
  )
}
