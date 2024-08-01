import React, { useState } from 'react'
import axios from '../../../Axios'
import { useNavigate } from 'react-router-dom'

export const Delete = ({ user, serviceId, id }) => {
  const [error, setError] = useState()
  const navigate = useNavigate()

  const deleteShift = async () => {
    try {
      const response = await axios.delete(`/services/${serviceId}/shifts/${id}`, {
        headers: user
      })

      response.status === 200 && navigate(`/services/${serviceId}/shifts`)

    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error)
      } else {
        setError(error.toString())
      }
    }
  }

  const handleDelete = () => {
    const result = window.confirm('Se eliminará este turno. ¿Desea proceder?')

    result && deleteShift()
  }

  return (
    <>
      {error && <div className='alert alert-danger'>{error}</div>}
      <button onClick={handleDelete} type='button' className='btn btn-outline-danger'>Eliminar</button>
    </>
  )
}
