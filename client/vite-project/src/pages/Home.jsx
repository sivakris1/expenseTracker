import React from 'react'

const Home = () => {
  return (
    <div>
      {/* Main Content Below Navbar */}
      <div className="container-fluid" style={{ height: 'calc(100vh - 56px)' }}>
        <div className="row h-100">
          {/* Left Half - Image */}
          <div className="col-md-6 d-flex align-items-center justify-content-center p-0 bg-light">
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/expense-management-illustration-download-in-svg-png-gif-file-formats--business-finance-strategy-concept-pack-illustrations-3561009.png"
              alt="Expense Illustration"
              className="img-fluid w-100 h-100"
              style={{ objectFit: 'contain', padding: '2rem' }}
            />
          </div>

          {/* Right Half - Optional additional content */}
          <div className="col-md-6 d-flex align-items-center justify-content-center">
            <h2>Welcome to Expense Tracker</h2>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Home
