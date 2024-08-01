import React, { useEffect, useState } from 'react'
import axios from '../../../Axios'
import { Link, useParams } from 'react-router-dom'
import { Loading } from '../../Loading'
import { Delete } from './Delete'
import { ConfirmForm } from './ConfirmForm'

export const Confirm = ({ user }) => {
  const [service, setService] = useState()
  const [shift, setShift] = useState()
  const [apiResponse, setApiResponse] = useState()
  const { id } = useParams('id')
  const { serviceId } = useParams('serviceId')

  useEffect(() => {
    const getService = async () => {
      if (user) {
        try {
          const response = await axios.get(`/services/${serviceId}`, {
            headers: user
          });

          setService(response.data.service);
        } catch (error) {
          console.error(error);
        }
      }
    };

    serviceId && getService()
  }, [serviceId, user])

  useEffect(() => {
    const getShift = async () => {
      if (service) {
        try {
          const response = await axios.get(`/services/${serviceId}/shifts/${id}`, {
            headers: user
          })

          setApiResponse(response.data)
          setShift(response.data.shift)
        } catch (error) {
          console.error(); (error);
        }
      }
    }

    getShift()
  }, [user, service])


  return (
    <>
      {
        (user && shift) ? (
          <div className='container py-3'>
            <Link to={`/services/${serviceId}/shifts`} title='Atrás'>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
              </svg>
            </Link>
            <div className='text-center'>
              <h1>Turno: {shift.week}, {shift.year}</h1>

            </div>
            <ConfirmForm user={user} service={service} shift={shift} response={apiResponse}></ConfirmForm>
            <div className='text-center mt-3'>
              <Delete user={user} serviceId={serviceId} id={id}></Delete>
            </div>
          </div>
        ) : (
          <Loading />
        )
      }
    </>
  )
}
