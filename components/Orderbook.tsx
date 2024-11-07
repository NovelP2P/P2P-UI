import React,{useState} from 'react';
import { ArrowRightLeft, Plus } from 'lucide-react';
import { useWriteContract } from 'wagmi';
import { parseEther } from 'viem';
import {abi} from "@/app/utils/abi"

// Custom Button Component
const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}) => {
  const baseStyles = "px-4 py-2 rounded-lg font-medium transition-colors";
  const variants = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white",
    outline: "border border-blue-500 text-blue-500 hover:bg-blue-50",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-800"
  };
  
  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const OrderBookPage = () => {
  const {writeContract}= useWriteContract();
  const [partialFill, setPartialFill]= useState(false);
  const [tokenToSell, setTokenToSell]= useState("");
  const [tokenToBuy, setTokenToBuy]= useState("");
  const [amountToSell, setAmountToSell]= useState("");
  const [amountToBuy, setAmountToBuy]= useState("");
  const [minTradeAmount, setMinTradeAmount]= useState("0");
  const [maxTradeAmount, setMaxTradeAmount]= useState("0");
  const [timelock,setTimelock]= useState(0);

  // Mock data for demonstration
  const mockOrders = [
    {
      orderId: 1,
      maker: "0x1234...5678",
      tokenToSell: "ETH",
      tokenToBuy: "USDC",
      amountToSell: "1.5",
      amountToBuy: "3000",
      minTradeAmount: "0.1",
      maxTradeAmount: "1.5",
      timelock: new Date().getTime() + 86400000,
    },
    // Add more mock orders as needed
  ];
  const handlePartialFilled=(e:React.SyntheticEvent)=>{
      setPartialFill(e.target.checked)
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {/* Order Book */}
        <div className="md:col-span-2 bg-white rounded-lg shadow-md">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-black">
                Order Book 
              </h2>
              <Button variant="outline" className="flex items-center">
                <ArrowRightLeft className="w-4 h-4 mr-2" />
                Switch Pair
              </Button>
            </div>
          </div>
          <div className="p-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left bg-gray-50 text-gray-600">
                    <th className="p-3">Price</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Total</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody className='text-gray-500'>
                  {mockOrders.map((order) => (
                    <tr key={order.orderId} className="border-t">
                      <td className="p-3">
                        {(Number(order.amountToBuy) / Number(order.amountToSell)).toFixed(2)}
                      </td>
                      <td className="p-3">
                        {order.amountToSell} {order.tokenToSell}
                      </td>
                      <td className="p-3">
                        {order.amountToBuy} {order.tokenToBuy}
                      </td>
                      <td className="p-3">
                        <Button>Take Order</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Create Order Card */}
        <div className="bg-white rounded-lg shadow-md w-[33vw]">
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold text-black">Create Order</h2>
          </div>
          <div className="p-4">
            <form className="space-y-4" onSubmit={(e)=>e.preventDefault}>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-600">
                  I want to sell
                </label>
                <div className="flex gap-2">
                <input
                    type="text"
                    className="w-1/2 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    placeholder="Amount"
                    onChange={(e)=>setAmountToSell((e.target.value))}
                  />
                  <input
                    type="text"
                    className="w-1/2 px-1 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    placeholder="Token"
                    onChange={(e)=>setTokenToSell(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-600">
                  I want to buy
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="w-1/2 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    placeholder="Amount"
                    onChange={(e)=>setAmountToBuy((e.target.value))}
                  />
                  <input
                    type="text"
                    className="w-1/2 px-1 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    placeholder="Token"
                    onChange={(e)=>setTokenToBuy(e.target.value)}
                  />
                </div>
              </div>

              {partialFill&&
              <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-600">
                  Min Trade
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Min amount"
                  onChange={(e)=>setMinTradeAmount((e.target.value))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-600">
                  Max Trade
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Max amount"
                  onChange={(e)=>setMaxTradeAmount((e.target.value))}
                />
              </div>
            </div>
              }

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-600">
                  Order Expiry
                </label>
                <input
                  type="datetime-local"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e)=>setTimelock(Math.floor(new Date(e.target.value).getTime()/1000))}
                />
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="partial" onChange={handlePartialFilled} />
                <label htmlFor="partial" className="text-sm text-gray-600">
                  Allow partial fills
                </label>
              </div>

              <Button type="submit" className="w-full flex items-center justify-center" onClick={()=>writeContract({
                address:"0x4DC0e8e9aBA0A30D5984284ed1b1CfA18F14bb02",
                abi,
                functionName:'createOrder',
                args:[tokenToSell,tokenToBuy,parseEther(amountToSell),
                  parseEther(amountToBuy)
                  ,parseEther(minTradeAmount),
                  parseEther(maxTradeAmount),
                  timelock,
                  partialFill]
              })}>
                <Plus className="w-4 h-4 mr-2" />
                Create Order
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderBookPage;