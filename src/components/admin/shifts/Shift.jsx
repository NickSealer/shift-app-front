import React from 'react'

export const Shift = ({ shift }) => {
  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

  return (
    <>
      <button type="button" className="btn btn-outline-info" data-bs-toggle="modal" data-bs-target={`#${shift.id}`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
          <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
          <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
        </svg>
      </button>

      <div className="modal fade" id={shift.id} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-scrollable">
          <div className="modal-content text-center">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Detalle turno {shift.week}, {shift.year}</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className='row'>
                {
                  daysOfWeek.map((day, key) => {
                    return (
                      <div className='col-12' key={key}>
                        <h3>{day.charAt(0).toUpperCase() + day.slice(1)}</h3>
                        <table className='table table-sm table-bordered table-hover'>
                          <thead>
                            <tr>
                              <th>Fecha</th>
                              <th>Hora</th>
                              <th>Encargado</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              shift.data[day]?.dates.map((date) => {
                                return (
                                  <tr className='table-info'>
                                    <td>{date.date}</td>
                                    <td>{date.hour}</td>
                                    <td>{date.name}</td>
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
