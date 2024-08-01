import axios from '../../../Axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Loading } from '../../Loading'
import { Pagination } from '../../Pagination'

export const Services = ({ user }) => {
  const [services, setServices] = useState([])
  const [status, setStatus] = useState(0)

  const [pages, setPages] = useState()
  const [page, setPage] = useState(1)
  const [nextPage, setNextPage] = useState()
  const [prevPage, setPrevPage] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    const getServices = async () => {
      try {
        const response = await axios.get('/services', {
          headers: user,
          params : {
            page: page
          }
        })

        setStatus(response.status)
        setServices(response.data.services)

        setPages(response.data.metadata.total_pages)
        setNextPage(response.data.metadata.next_page)
        setPrevPage(response.data.metadata.previous_page)
        navigate(`/services?page=${page}`)
      } catch (error) {
        console.error(error);
      }
    }
    getServices()
  }, [page, navigate])

  const handleNextPage = () => nextPage && setPage(Number(nextPage))
  const handlePrevPage = () => prevPage && setPage(Number(prevPage))

  return (
    <>
      {
        status === 200 ? (
          <div className='container py-3 text-center'>
            <h1>Servicios</h1>
            <div className='table-responsive'>
              <table className='table table-hover'>
                <thead className='table-info'>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    services.map((service) => {
                      return (
                        <tr key={service.id}>
                          <th>{service.id}</th>
                          <td>{service.name}</td>
                          <td colSpan={2}>
                            <Link to={`/services/${service.id}/availabilities/`} className='btn btn-outline-primary m-1'>Ver mi disponibilidad</Link>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
            {
              pages > 1 && <Pagination next={handleNextPage} prev={handlePrevPage}></Pagination>
            }
          </div>
        ) : (
          <Loading />
        )
      }
    </>
  )
}
