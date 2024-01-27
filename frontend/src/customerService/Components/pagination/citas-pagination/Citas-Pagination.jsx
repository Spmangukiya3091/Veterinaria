import React from 'react'
import ResponsivePagination from 'react-responsive-pagination';
import "./citas_pagination.scss"
function CitasPagination({ current, total, onPageChange }) {

  return (
    <div className='citas-pagination-container'>
      <ResponsivePagination
        total={total}
        current={current}
        onPageChange={onPageChange}
        previousLabel={<i className="fa-solid fa-chevron-left"></i>}
        nextLabel={<i className="fa-solid fa-chevron-right"></i>}
      />
    </div>
  )
}

export default CitasPagination