import React from 'react';

const ExpenseSummary = ({ expenseStats , userProfile}) => {
//   const { sumTotal, avg, min, max, count } = expenseStats;
console.log("expense",expenseStats)

  return (
    <div className="border rounded p-3 mb-3">
      <h4 className="text-danger">Expenses</h4>
      <h1>₹{expenseStats?.sumTotal}</h1>
      <p><strong>Number of Transactions:</strong> {userProfile?.expenses?.length}</p>
      <p><strong>Minimum Transaction:</strong> ₹{expenseStats?.min}</p>
      <p><strong>Maximum Transaction:</strong> ₹{expenseStats?.max}</p>
      <p><strong>Average Transaction:</strong> ₹{expenseStats?.avg}</p>
       {/* <button className="btn btn-danger" onClick={onViewHistory}>View Expenses History</button>  */}
    </div>
  );
};

export default ExpenseSummary;
