import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { accountStatisticsAction } from "../../Redux/slices/accountStatisticsSlice/accountStatisticsSlice";
import IncomeExpensePieChart from "../../chart/IncomeExpensePieChart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from "recharts";

const AccountStatistics = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(accountStatisticsAction());
  }, [dispatch]);

  const { expensesList, userLoading, AppErr, ServerErr } = useSelector(
    (state) => state.accounts
  );

  const expenseStats = expensesList?.expenseStats;
  const incomeStats = expensesList?.incomeStats;

  const totalIncome = incomeStats?.totalIncome ?? 0;
  const totalExpense = expenseStats?.totalExp ?? 0;
  const netBalance = totalIncome - totalExpense;

  // Calculate savings percentage
  const savingsRate = totalIncome > 0 ? ((netBalance / totalIncome) * 100).toFixed(1) : 0;

  // Data for Recharts Bar Chart comparison
  const barChartData = [
    { name: "Total Income", amount: totalIncome },
    { name: "Total Expenses", amount: totalExpense }
  ];

  // Colors for Bar Chart
  const BAR_COLORS = ["#198754", "#dc3545"]; // Green and Red

  return (
    <div className="container py-5">
      {/* Dashboard Title */}
      <div className="text-center mb-5">
        <h2 className="fw-bold text-dark">Financial Analytics Dashboard</h2>
        <p className="text-muted">A secure overview of your income, expenses, and savings health</p>
      </div>

      {userLoading ? (
        <div className="d-flex justify-content-center align-items-center py-5">
          <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : AppErr || ServerErr ? (
        <div className="alert alert-danger shadow-sm" role="alert">
          <strong>Error loading dashboard:</strong> {AppErr || ServerErr}
        </div>
      ) : (
        <>
          {/* 1. Summary Cards Row */}
          <div className="row text-center mb-4 g-4">
            {/* Total Income Card */}
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm bg-success text-white rounded-4 overflow-hidden">
                <div className="card-body p-4">
                  <span className="text-uppercase fw-semibold tracking-wider opacity-75">Total Income</span>
                  <h2 className="display-6 fw-bold mt-2 mb-0">₹{totalIncome.toLocaleString()}</h2>
                  <small className="opacity-75">{incomeStats?.totalRecordsIncome ?? 0} transactions</small>
                </div>
              </div>
            </div>

            {/* Total Expense Card */}
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm bg-danger text-white rounded-4 overflow-hidden">
                <div className="card-body p-4">
                  <span className="text-uppercase fw-semibold tracking-wider opacity-75">Total Expenses</span>
                  <h2 className="display-6 fw-bold mt-2 mb-0">₹{totalExpense.toLocaleString()}</h2>
                  <small className="opacity-75">{expenseStats?.totalRecordsExp ?? 0} transactions</small>
                </div>
              </div>
            </div>

            {/* Net Balance Card */}
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm text-white rounded-4 overflow-hidden" 
                   style={{ backgroundColor: netBalance >= 0 ? "#0d6efd" : "#fd7e14" }}>
                <div className="card-body p-4">
                  <span className="text-uppercase fw-semibold tracking-wider opacity-75">Net Savings / Balance</span>
                  <h2 className="display-6 fw-bold mt-2 mb-0">
                    {netBalance < 0 ? "-" : ""}₹{Math.abs(netBalance).toLocaleString()}
                  </h2>
                  <small className="opacity-75">{netBalance >= 0 ? `${savingsRate}% of income saved` : 'Spending exceeds income!'}</small>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Visualizations Row */}
          <div className="row mb-5 g-4">
            {/* Pie Chart Card */}
            <div className="col-lg-6">
              <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
                <h5 className="fw-bold mb-4 text-center">Income vs. Expense Share</h5>
                <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "300px" }}>
                  <IncomeExpensePieChart income={totalIncome} expense={totalExpense} />
                </div>
              </div>
            </div>

            {/* Bar Chart Card */}
            <div className="col-lg-6">
              <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
                <h5 className="fw-bold mb-4 text-center">Comparison Bar Chart</h5>
                <div style={{ width: "100%", height: 300 }}>
                  <ResponsiveContainer>
                    <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="name" stroke="#6c757d" />
                      <YAxis stroke="#6c757d" />
                      <Tooltip formatter={(value) => `₹${value}`} />
                      <Legend />
                      <Bar dataKey="amount" fill="#8884d8" radius={[8, 8, 0, 0]}>
                        {barChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={BAR_COLORS[index]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Transaction Statistics Row */}
          <div className="row g-4">
            {/* Expense Aggregates */}
            <div className="col-md-6">
              <div className="card border-0 shadow-sm rounded-4 overflow-hidden h-100">
                <div className="card-header bg-light border-0 py-3">
                  <h5 className="fw-bold mb-0 text-danger text-center">Expense Statistics</h5>
                </div>
                <div className="card-body p-4">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0">
                      <span className="text-muted">Minimum Transaction</span>
                      <span className="fw-semibold">₹{expenseStats?.minExp ?? 0}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0">
                      <span className="text-muted">Maximum Transaction</span>
                      <span className="fw-semibold">₹{expenseStats?.maxExp ?? 0}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0">
                      <span className="text-muted">Average Transaction</span>
                      <span className="fw-semibold">₹{expenseStats?.averageExp?.toFixed(2) ?? 0}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Income Aggregates */}
            <div className="col-md-6">
              <div className="card border-0 shadow-sm rounded-4 overflow-hidden h-100">
                <div className="card-header bg-light border-0 py-3">
                  <h5 className="fw-bold mb-0 text-success text-center">Income Statistics</h5>
                </div>
                <div className="card-body p-4">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0">
                      <span className="text-muted">Minimum Transaction</span>
                      <span className="fw-semibold">₹{incomeStats?.minIncome ?? 0}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0">
                      <span className="text-muted">Maximum Transaction</span>
                      <span className="fw-semibold">₹{incomeStats?.maxIncome ?? 0}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0">
                      <span className="text-muted">Average Transaction</span>
                      <span className="fw-semibold">₹{incomeStats?.averageIncome?.toFixed(2) ?? 0}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AccountStatistics;
