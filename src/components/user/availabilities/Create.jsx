import React, { useState } from 'react'
import { Form } from './Form'
import axios from '../../../Axios'

export const Create = ({ user, service }) => {
  const [error, setError] = useState()

  const createAvailability = async (e, refs) => {
    e.preventDefault();

    const daysAttributes = []
    const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

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
      const response = await axios.post(
        `/services/${service.id}/availabilities`,
        {
          availability: {
            from: refs.week.current.value,
            service_id: service.id,
            confirmed: refs.confirmed.current.checked,
            days_attributes: daysAttributes
          }
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

  return (
    <>
      <button type="button" className="btn btn-outline-success" data-bs-toggle="modal" data-bs-target='#create-availability'>
        Registrar Disponibilidad
      </button>

      <div className="modal fade" id='create-availability' data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-fullscreen modal-dialog-scrollable">
          <div className="modal-content text-center">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Registrar Disponibilidad</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="modal-body">
              <Form user={user} service={service} handleSubmit={createAvailability} />
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
