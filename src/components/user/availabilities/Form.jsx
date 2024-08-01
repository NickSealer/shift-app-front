import React, { useEffect, useRef, useState } from 'react'
import '../../../assets/styles/schedule.css'
import { WeekSelect } from './WeekSelect'

export const Form = ({ user, service, handleSubmit, availability = null }) => {
  const weekRef = useRef('week')
  const confirmedRef = useRef('confirm')
  const [confirmed] = useState(availability?.confirmed)
  const [formState, setFormState] = useState({})

  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

  const handleCheckboxChange = (day, hour) => {
    const key = `${day}-${hour}`;
    setFormState(prevState => ({
      ...prevState,
      [key]: !prevState[key]
    }))
  }

  useEffect(() => {
    if (availability) {
      const initialFormState = {};
      availability.days.forEach(date => {
        const key = `${date.day_name}-${date.time}`;
        initialFormState[key] = date.available;
      });
      setFormState(initialFormState);
    }
  }, [availability])

  const checkAvailability = (availability, day, hour) => {
    return availability.some(item => {
      return item.day_name == day && item.time == hour
    })
  }

  const refs = {
    week: weekRef,
    confirmed: confirmedRef,
    formState
  }

  return (
    <div>
      <form onSubmit={e => handleSubmit(e, refs)} className='text-center'>
        <div className='row'>
          {
            !availability &&
            <div className='col-12 mb-3'>
              <label htmlFor='week' className='form-label'>Semana</label>
              <WeekSelect weekRef={weekRef} user={user}></WeekSelect>
            </div>
          }
          {
            daysOfWeek.map(day => (
              <div className='col-sm-6 col-md-3' key={day}>
                <div className='schedule'>
                  <p className='form-label text-center'>{day.charAt(0).toUpperCase() + day.slice(1)}</p>
                  <table className='table table-sm table-bordered table-hover'>
                    <thead>
                      <tr>
                        <th>Hora</th>
                        <th>Disponible</th>
                        <th>Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        service[day].map((hour) => {
                          const key = `${day}-${hour}`;
                          const result = formState[key] !== undefined ? formState[key] : (availability ? checkAvailability(availability.days, day, hour) : false);

                          return (
                            <tr key={key} className={result ? 'table-info' : 'table-danger'}>
                              <td><label htmlFor={`${availability ? `${availability.id}-` : ''}${key}`}>{hour}</label></td>
                              <td>
                                <input
                                  className='form-check-input'
                                  type='checkbox'
                                  id={`${availability ? `${availability.id}-` : ''}${key}`}
                                  name={`${availability ? `${availability.id}-` : ''}${key}`}
                                  checked={!!result}
                                  disabled={confirmed}
                                  onChange={() => handleCheckboxChange(day, hour)}
                                />
                              </td>
                              <td className={`text-center ${result ? 'available' : 'unavailable'}`}>
                                {
                                  result ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-check-circle text-success" viewBox="0 0 16 16">
                                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                      <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
                                    </svg>
                                  ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-exclamation-triangle text-warning" viewBox="0 0 16 16">
                                      <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z" />
                                      <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
                                    </svg>
                                  )
                                }
                              </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            ))
          }
        </div>
        {
          confirmed ? (
            <button type='button' className='btn btn-success'>Confirmado</button>
          ) : (
            <>
              <div className='form-check mb-3 text-center confirmed'>
                <input ref={confirmedRef} className='form-check-input' type='checkbox' defaultChecked={false} id={`${availability ? `${availability.id}-confirmed` : 'confirmed'}`} name={`${availability ? `${availability.id}-confirmed` : 'confirmed'}`} />
                <label className='form-check-label' htmlFor={`${availability ? `${availability.id}-confirmed` : 'confirmed'}`}>
                  Confirmar
                </label>
              </div>
              <div className='mb-3'>
                <small className='form-text text-dark mb-3'>Una vez confirmado, no se podrán realizar cambios a la disponibilidad.</small>
              </div>
              <button type='submit' className='btn btn-outline-success'>Guardar</button>
            </>
          )
        }
      </form>
    </div>
  )
}
