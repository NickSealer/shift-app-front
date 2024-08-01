import React from 'react'

export const Pagination = ({next, prev}) => {
  return (
    <div className='text-center'>
      <button type='button' className='btn btn-outline-primary' style={{marginRight: 5}} onClick={prev}>Anterior</button>
      <button type='button' className='btn btn-outline-primary' onClick={next}>Siguiente</button>
    </div>
  )
}
