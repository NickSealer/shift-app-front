import React, { useState } from 'react'
import axios from '../../../Axios'

export const Create = ({ user, serviceId }) => {
  const [error, setError] = useState()

  const generateShift = async (e) => {
    e.preventDefault();

    if (user && serviceId) {
      try {
        const response = await axios.post(
          `/services/${serviceId}/shifts`,
          {
            service_id: serviceId
          },
          {
            headers: user
          }
        )
        response.status === 201 && location.reload();

      } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
          setError(error.response.data.error)
        } else {
          setError(error.toString())
        }
      }
    }
  }

  return (
    <div className='container py-2'>
      <button onClick={e => generateShift(e)} type='button' className='btn btn-outline-success'>Generar hoja</button>
      <br></br>
      <small className='form-text text-dark'>Se generará la hoja de turnos de la siguiente semana.</small>
      {error && <div className='alert alert-danger'>{error}</div>}
    </div>
  )
}
