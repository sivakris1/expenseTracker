import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { accountStatisticsAction } from "../../Redux/slices/accountStatisticsSlice/accountStatisticsSlice";
import IncomeExpensePieChart from "../../chart/IncomeExpensePieChart";

const AccountStatistics = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(accountStatisticsAction());
  }, [dispatch]);

  // ✅ Use correct selector
  const { expensesList, userLoading, AppErr, ServerErr } = useSelector(
    (state) => state.accounts
  );

  const expenseStats = expensesList?.expenseStats;
  const incomeStats = expensesList?.incomeStats;

  return (
    <div className="container mt-5">
      <div className="row text-center">
        {/* Expense Stats */}
        <div className="col-md-6 mb-4">
          <div className="card shadow">
            <div className="card-header bg-danger text-white">
              <h4 className="mb-0">Total Expenses</h4>
            </div>
            <div className="card-body">
              <p>
                <strong>Number of Transactions:</strong>{" "}
                {expenseStats?.totalRecordsExp ?? 0}
              </p>
              <p>
                <strong>Minimum Transaction:</strong> ₹
                {expenseStats?.minExp ?? 0}
              </p>
              <p>
                <strong>Maximum Transaction:</strong> ₹
                {expenseStats?.maxExp ?? 0}
              </p>
              <p>
                <strong>Average Transaction:</strong> ₹
                {expenseStats?.averageExp?.toFixed(2) ?? 0}
              </p>
              <p>
                <strong>Total Amount:</strong> ₹{expenseStats?.totalExp ?? 0}
              </p>
            </div>
          </div>
        </div>

        {/* Income Stats */}
        <div className="col-md-6 mb-4">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Total Income</h4>
            </div>
            <div className="card-body">
              <p>
                <strong>Number of Transactions:</strong>{" "}
                {incomeStats?.totalRecordsIncome ?? 0}
              </p>
              <p>
                <strong>Minimum Transaction:</strong> ₹
                {incomeStats?.minIncome ?? 0}
              </p>
              <p>
                <strong>Maximum Transaction:</strong> ₹
                {incomeStats?.maxIncome ?? 0}
              </p>
              <p>
                <strong>Average Transaction:</strong> ₹
                {incomeStats?.averageIncome?.toFixed(2) ?? 0}
              </p>
              <p>
                <strong>Total Amount:</strong> ₹{incomeStats?.totalIncome ?? 0}
              </p>
            </div>
          </div>
        </div>
      </div>
      <IncomeExpensePieChart
        income={incomeStats?.totalIncome ?? 0}
        expense={expenseStats?.totalExp ?? 0}
      />{" "}
    </div>
  );
};

export default AccountStatistics;
