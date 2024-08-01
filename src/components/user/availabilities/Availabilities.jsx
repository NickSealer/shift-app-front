import axios from '../../../Axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Loading } from '../../Loading'
import { Update } from './Update'
import { Create } from './Create'
import { Pagination } from '../../Pagination'

export const Availabilities = ({ user }) => {
  const [availabilities, setAvailabilities] = useState()
  const [service, setService] = useState()
  const { id } = useParams('id')

  const [pages, setPages] = useState()
  const [page, setPage] = useState(1)
  const [nextPage, setNextPage] = useState()
  const [prevPage, setPrevPage] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    const getService = async () => {
      if (user) {
        try {
          const response = await axios.get(`/services/${id}`, {
            headers: user
          })

          setService(response.data.service);
        } catch (error) {
          console.error(error);
        }
      }
    };

    id && getService()
  }, [id, user])

  useEffect(() => {
    const getAvailabilities = async () => {
      if (service) {
        try {
          const response = await axios.get(`/services/${service.id}/availabilities`, {
            headers: user,
            params: {
              page: page
            }
          })

          setAvailabilities(response.data.availabilities)

          setPages(response.data.metadata.total_pages)
          setNextPage(response.data.metadata.next_page)
          setPrevPage(response.data.metadata.previous_page)
          navigate(`/services/${service.id}/availabilities?page=${page}`)
        } catch (error) {
          console.error(error);
        }
      }
    }
    getAvailabilities()
  }, [id, user, service, page, navigate])

  const handleNextPage = () => nextPage && setPage(Number(nextPage))
  const handlePrevPage = () => prevPage && setPage(Number(prevPage))

  return (
    <>
      {
        (user && service && availabilities) ? (
          <div className='container py-3'>
            <Link to='/services' title='Atrás'>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
              </svg>
            </Link>
            <div className='text-center mb-3'>
              <h1>Mi Disponibilidad</h1>
              {
                <Create user={user} service={service}></Create>
              }
            </div>
            <div className='table-responsive text-center'>
              <table className='table table-hover'>
                <thead className='table-info'>
                  <tr>
                    <th>Semana</th>
                    <th>Fechas</th>
                    <th>Servicio ID</th>
                    <th>Confirmado</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    availabilities.map((availability) => {
                      return (
                        <tr key={availability.id}>
                          <td>{availability.week}, {availability.year}</td>
                          <td>Desde: {availability.from} | Hasta: {availability.to}</td>
                          <td>{availability.service_id}</td>
                          <td>
                            {
                              availability.confirmed ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-check-circle text-success" viewBox="0 0 16 16">
                                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                  <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
                                </svg>
                              ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-circle text-danger" viewBox="0 0 16 16">
                                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                                </svg>
                              )
                            }
                          </td>
                          <td>
                            <Update user={user} service={service} availability={availability} key={availability.id}></Update>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
            {
              pages > 1 &&
              <div className='text-center'>
                <Pagination next={handleNextPage} prev={handlePrevPage}></Pagination>
              </div>
            }
          </div>
        ) : (
          <Loading />
        )
      }
    </>
  )
}
