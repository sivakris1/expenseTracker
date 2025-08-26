import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userProfileAction } from '../../Redux/slices/users/usersSlices';
import IncomeExpensePieChart from '../../chart/IncomeExpensePieChart';
import calcTransaction from '../../../../../server/src/controllers/accountStatistics/accountStatistics2';
import IncomeSummary from '../../templates/incomeDetails';
import ExpenseSummary from '../../templates/expenseDetails';

const Profile = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector(state => state.users);
  const { loading, appErr, serverErr, userProfile } = state;

  useEffect(() => {
    dispatch(userProfileAction());
  }, [dispatch]);

  const incomeResult = userProfile?.income && calcTransaction(userProfile?.income);
  const expenseResult = userProfile?.expenses && calcTransaction(userProfile?.expenses);

  const totalIncome = userProfile?.income?.reduce((acc, curr) => acc + Number(curr?.amount), 0);
  const totalExpense = userProfile?.expenses?.reduce((acc, curr) => acc + Number(curr?.amount), 0);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Profile</h3>
        <button className="btn btn-warning" onClick={() => navigate('/logout')}>Logout</button>
      </div>

      <div className="card shadow-lg p-4">
        <div className="row">
          {/* Profile Info */}
          <div className="col-md-4 text-center mb-4">
            <img
              src={user?.profilePhoto || 'https://cdn2.iconfinder.com/data/icons/random-outline-3/48/random_14-512.png'}
              alt="Profile"
              className="img-fluid rounded-circle mb-3"
              style={{ width: '150px', height: '150px' }}
            />
            <div><strong>{userProfile?.firstname} {userProfile?.lastname}</strong></div>
            <p className="text-primary fw-bold">{userProfile?.expenses?.length + userProfile?.income?.length} Records Created</p>
            <p><strong>Date Joined:</strong> {user?.dateJoined || '12-Jan-1999'}</p>
            <button className="btn btn-link" onClick={() => navigate('/edit-profile')}>Edit Profile</button>
          </div>

          {/* Buttons */}
          <div className="col-md-8 d-flex align-items-center justify-content-between mb-4">
            <button className="btn btn-danger px-4" onClick={() => navigate('/expenses')}>View Expenses History</button>
            <button className="btn btn-outline-secondary px-4" onClick={() => navigate('/income')}>View Income History</button>
          </div>

          {/* Statistics Row */}
          <div className="col-12">
            <div className="row text-center">
              <div className="col-md-4 mb-3">
                <IncomeSummary incomeStats={incomeResult} userProfile={userProfile} />
              </div>
              <div className="col-md-4 mb-3 d-flex justify-content-center align-items-center">
                <IncomeExpensePieChart income={totalIncome} expense={totalExpense} />
              </div>
              <div className="col-md-4 mb-3">
                <ExpenseSummary expenseStats={expenseResult} userProfile={userProfile} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
