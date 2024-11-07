"use client"
import { useState } from 'react'

export default function MyOrders() {
  const [activeTab, setActiveTab] = useState('active')
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold mb-4 text-black">My Orders</h2>
          <div className="flex gap-4">
            <button 
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'active' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('active')}
            >
              Active Orders
            </button>
            <button 
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'history' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('history')}
            >
              Order History
            </button>
          </div>
        </div>
        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left bg-gray-50 text-gray-600">
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Sell</th>
                  <th className="p-3">Buy</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Expires</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Add order data here */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}