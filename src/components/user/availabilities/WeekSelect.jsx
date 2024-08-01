import axios from '../../../Axios'
import React, { useEffect, useState } from 'react'
import { Loading } from '../../Loading'

export const WeekSelect = ({ user, weekRef, value = '' }) => {
  const [status, setStatus] = useState(0)
  const [weeks, setWeeks] = useState([])

  useEffect(() => {
    const getWeeks = async () => {
      try {
        const response = await axios.get('/weeks', {
          headers: user
        });
        setWeeks(response.data.weeks);
        setStatus(response.status);
      } catch (error) {
        console.error();
      }
    }

    user && getWeeks()
  }, [])

  return (
    <>
      {
        status == 200 ? (
          <select className='form-control' id='week' name='week' ref={weekRef} defaultValue={value}>
            {
              weeks.map((week, key) => {
                return (
                  <option key={key} value={week[0]}>{week[1]}</option>
                )
              })
            }
          </select>
        ) : (
          <Loading />
        )
      }
    </>
  )
}
