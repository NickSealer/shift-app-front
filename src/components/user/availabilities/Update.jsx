import React, { useState } from 'react'
import '../../../assets/styles/schedule.css'
import { Form } from './Form'
import axios from '../../../Axios'

export const Update = ({ user, availability, service }) => {
  const [error, setError] = useState()

  const updateAvailability = async (e, refs) => {
    e.preventDefault();

    if (availability.confirmed) {
      return;
    }

    const daysAttributes = [];
    const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

    daysOfWeek.forEach(day => {
      service[day].forEach(hour => {
        const key = `${day}-${hour}`
        if (refs.formState[key]) {
          daysAttributes.push({
            time: hour,
            available: refs.formState[key],
            day_name: day
          })
        }
      })
    })

    try {
      const response = await axios.put(
        `/services/${service.id}/availabilities/${availability.id}`,
        {
          availability: {
            confirmed: refs.confirmed.current.checked,
            days_attributes: daysAttributes
          }
        },
        {
          headers: user
        }
      )

      response.status === 200 && location.reload();

    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error)
      } else {
        setError(error.toString())
      }
    }
  }

  return (
    <>
      <button type="button" className={`btn btn-outline-${availability.confirmed ? 'info' : 'success'}`} data-bs-toggle="modal" data-bs-target={`#${availability.id}`}>
        {
          availability.confirmed ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
            </svg>
          )
        }
      </button>

      <div className="modal fade" id={availability.id} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-fullscreen modal-dialog-scrollable">
          <div className="modal-content text-center">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Actualizar Disponibilidad</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="modal-body">
              <h4 className='text-center'>Semana {availability.week}, {availability.year} {availability.confirmed ? '- Confirmada' : ''}</h4>
              <Form user={user} service={service} availability={availability} handleSubmit={updateAvailability} />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
