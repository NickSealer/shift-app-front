import React, { useState } from 'react'
import axios from '../../../Axios'
import { useNavigate } from 'react-router-dom'
import '../../../assets/styles/shifts.css'

export const ConfirmForm = ({ user, service, shift, response }) => {
  const [availabilities, setAvailabilities] = useState(response.availabilities)
  const [confirmed, setConfirmed] = useState(response.confirmed)
  const [mandatory, setMandatory] = useState(response.mandatory)
  const [error, setError] = useState()
  const navigate = useNavigate()

  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

  // Prefill the checkboxes if available is true
  const checkAvailability = (days, day, hour) => {
    const date = days.find(d => d.day_name === day && d.time === hour);
    return date?.available;
  }

  // Count the current checkboxes to calculate the total hours
  const countHours = () => {
    const total = availabilities.reduce((cont, availability) => {
      const daysCheked = availability.days.filter(date => date.available).length
      return cont + daysCheked;
    }, 0)

    return total;
  }

  // Manage the checkbox state, identify the right checkbox 
  // according to the availability of the user, the day and time
  const handleCheckboxChange = (availabilityId, day, hour) => {
    setAvailabilities(prevState => prevState.map(availability => {
      if (availability.id === availabilityId) {
        return {
          ...availability,
          days: availability.days.map(date => {
            if (date.day_name === day && date.time === hour) {
              return {
                ...date,
                available: !date.available
              }
            }
            return date;
          })
        }
      }
      return availability;
    }))
  }

  const buildUsers = (availabilities) => {
    return availabilities.map(availability => (
      {
        user_id: availability.user_id,
        name: availability.user_name,
        availability: availability.id
      }
    ))
  }

  const buildDates = (day, hour, availabilities) => {
    const dates = [];
    availabilities.forEach(availability => {
      const date = availability.days.find(d => d.day_name === day && d.time === hour);
      if (date?.available) {
        dates.push({
          hour: hour,
          date: date.date,
          user_id: availability.user_id,
          name: availability.user_name
        })
      }
    })
    return dates;
  }

  // Data json body:
  // {
  //   dayName: {
  //     users: [{ user_id: 1, name: "name 1", availability: 6 }],
  //     dates: [{ hour: "19:00-20:00", date: "28-07-2024", user_id: 1, name: "name 1" }]
  //   }...
  // }

  const buildData = (daysOfWeek, service, availabilities) => {
    const data = {};
    daysOfWeek.forEach(day => {
      data[day] = { users: buildUsers(availabilities), dates: [] }

      service[day].forEach(hour => {
        data[day].dates.push(...buildDates(day, hour, availabilities))
      })
    })
    return data;
  }

  const confirmShift = async () => {
    try {
      const response = await axios.put(
        `/services/${service.id}/shifts/${shift.id}`,
        {
          shift: {
            confirmed: true,
            data: buildData(daysOfWeek, service, availabilities)
          }
        },
        {
          headers: user
        }
      )

      response.status === 200 && navigate(`/services/${service.id}/shifts/`)

    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error)
      } else {
        setError(error.toString())
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    confirmShift()
  }

  return (
    <>
      <div className='hours-info'>
        <span><strong>Horas servicio:</strong> {service.total_hours}</span>
        <br></br>
        <span><strong>Horas turno:</strong> {countHours()}</span>
      </div>
      {
        (confirmed < mandatory) && <p className='alert alert-warning'>Se necesitan {mandatory} confirmaciones de disponibilidad para aprobar este turno. Actualmente hay {confirmed}.</p>}
      <form onSubmit={handleSubmit} className='text-center'>
        <div className='row'>
          {
            daysOfWeek.map((day) => {
              return (
                <div className='col-12' key={day}>
                  <h2>{day.charAt(0).toUpperCase() + day.slice(1)}</h2>
                  <table className='table table-sm table-bordered table-hover'>
                    <thead>
                      <tr>
                        <th>Hora</th>
                        {
                          availabilities.map((availability) => {
                            return (
                              <th key={availability.id}>{availability.user_name}</th>
                            )
                          })
                        }
                      </tr>
                    </thead>
                    <tbody>
                      {
                        service[day].map((hour) => {
                          return (
                            <tr key={hour}>
                              <td>{hour}</td>
                              {
                                availabilities.map(availability => {
                                  const key = `${day}-${hour}`;
                                  const result = checkAvailability(availability.days, day, hour);

                                  return (
                                    <td key={availability.id} className={result ? 'table-info' : 'table-danger'}>
                                      <label htmlFor={`${availability.id}-${key}`} style={{ display: 'block', height: '100%', width: '100%', cursor: 'pointer' }}>
                                        <input
                                          type='checkbox'
                                          id={`${availability.id}-${key}`}
                                          name={`${availability.id}-${key}`}
                                          checked={result}
                                          onChange={() => handleCheckboxChange(availability.id, day, hour)}
                                        />
                                      </label>
                                    </td>
                                  )
                                })
                              }
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </div>
              )
            })
          }
        </div>
        <div>
          {error && <div className='alert alert-danger'>{error}</div>}
          <button type='submit' className='btn btn-outline-success'>Confirmar turnos</button>
          <br></br>
          <small className='form-text text-dark'>Una vez confirmado, no se podrán realizar cambios.</small>
        </div>
      </form>
    </>
  )
}
