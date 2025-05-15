import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import Sidebar from "../components/Sidebar.jsx";
import Card from "../components/Card.jsx";
import Button from "../components/Button.jsx"

import { FiArrowUp, FiArrowDown } from "react-icons/fi";

const Dashboard = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Spending",
        data: [400, 300, 500, 700, 600, 650],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-6">
        <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
        
        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Card className="p-4 flex flex-col">
            <h3 className="text-lg font-semibold">Total Balance</h3>
            <p className="text-2xl font-bold">$5,000</p>
          </Card>
          <Card className="p-4 flex flex-col">
            <h3 className="text-lg font-semibold">Monthly Budget</h3>
            <p className="text-2xl font-bold">$3,000</p>
          </Card>
          <Card className="p-4 flex flex-col text-red-600">
            <h3 className="text-lg font-semibold">Expenses</h3>
            <p className="text-2xl font-bold">$1,500</p>
          </Card>
          <Card className="p-4 flex flex-col text-green-600">
            <h3 className="text-lg font-semibold">Income</h3>
            <p className="text-2xl font-bold">$4,500</p>
          </Card>
        </div>
        
        {/* Spending Trends Chart */}
        <div className="bg-white p-6 shadow-md rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-4">Spending Trends</h3>
          <Bar data={data} />
        </div>

        {/* Transactions Section */}
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
          <ul>
            <li className="border-b py-2 flex justify-between">
              <span>Grocery</span>
              <span className="text-red-600">- $50</span>
            </li>
            <li className="border-b py-2 flex justify-between">
              <span>Electricity Bill</span>
              <span className="text-red-600">- $120</span>
            </li>
            <li className="border-b py-2 flex justify-between">
              <span>Internet</span>
              <span className="text-red-600">- $60</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
