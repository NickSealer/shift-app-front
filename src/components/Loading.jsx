import React from 'react'

export const Loading = () => {
  return (
    <div className='py-5 text-center'>
      <div className="spinner-border text-success" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}
