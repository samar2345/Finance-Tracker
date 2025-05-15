import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // Importing icons for toggle button

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true); // Sidebar starts open

  return (
    <div className="flex">
      Hellow Samar
      {/* Sidebar Toggle Button - Available on all screens */}
      <button 
        className="p-2 m-2 bg-gray-800 text-white rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar - Slides in/out */}
      <div 
        className={`h-screen bg-gray-800 text-white p-4 transition-all duration-300 ${
          isOpen ? "w-64" : "w-0 overflow-hidden"
        }`}
      >
        {isOpen && (
          <div>
            <h2 className="text-xl font-bold mb-4">Finance Tracker</h2>
            <ul>
              <li className="mb-2"><a href="#" className="hover:text-gray-300">Dashboard</a></li>
              <li className="mb-2"><a href="#" className="hover:text-gray-300">Expenses</a></li>
              <li className="mb-2"><a href="#" className="hover:text-gray-300">Budgets</a></li>
              <li className="mb-2"><a href="#" className="hover:text-gray-300">Settings</a></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
