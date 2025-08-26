import React from 'react';

const IncomeSummary = ({ incomeStats, userProfile }) => {
//   const { sumTotal, avg, min, max, count } = incomeStats;

  return (
    <div className="border rounded p-3 mb-3">
      <h4 className="text-primary">Income Transactions</h4>
      <h1>₹{incomeStats?.sumTotal}</h1>
     <p><strong>Number of Transactions:</strong> {userProfile?.income?.length}</p>
      <p><strong>Minimum Transaction:</strong> ₹{incomeStats?.min}</p>
      <p><strong>Maximum Transaction:</strong> ₹{incomeStats?.max}</p>
      <p><strong>Average Transaction:</strong> ₹{incomeStats?.avg}</p>
      {/* <button className="btn btn-outline-primary" onClick={onViewHistory}>View Income History</button> */}
    </div>
  );
};

export default IncomeSummary;
