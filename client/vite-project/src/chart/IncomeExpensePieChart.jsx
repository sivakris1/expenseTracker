// components/IncomeExpensePieChart.jsx
import React from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// Define colors
const COLORS = ['#0088FE', '#FF8042'];

const IncomeExpensePieChart = ({ income, expense }) => {
    console.log("PieChart Data: ", income, expense);

  const data = [
    { name: 'Income', value: income },
    { name: 'Expense', value: expense },
  ];


  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncomeExpensePieChart;
