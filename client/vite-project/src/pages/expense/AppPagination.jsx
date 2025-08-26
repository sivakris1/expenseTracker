import React from 'react'

const AppPagination = ({pageNumber,setPage}) => {
    console.log(pageNumber);
    const arr = Array.from(Array(pageNumber).keys())
  return (
    <div className="d-flex justify-content-center mt-4">
  <nav aria-label="Page navigation">
    <ul className="pagination">
       {arr?.map(p => (
        <li
          key={p + 1}
        //   className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
        >
          <button
            className="page-link"
            onClick={(e) => setPage(e.target.textContent)}
          >
            {++p}
          </button>
        </li>
      ))}
         </ul>
  </nav>
</div>     
    
  )
}

export default AppPagination
