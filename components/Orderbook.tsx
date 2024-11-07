import React, { useState } from 'react';
import { ArrowRightLeft, Plus } from 'lucide-react';
import { useWriteContract, useReadContract } from 'wagmi';
import { parseEther } from 'viem';
import { abi, address } from "@/app/utils/abi";
import Orders from './Orders';

// Token options
const tokenOptions = {
  USDC: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
  WETH: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
  DAI: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
  LINK: '0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39',
  MTK1:'0x38d6939b75a29119CC1b1E317Ff7bcfa58a7e198',
  MTK2:'0xC485a8fE828e730EaDCBEB432eF5937dFD5b471a'
};

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
  const { writeContract } = useWriteContract();
  const [partialFill, setPartialFill] = useState(false);
  const [tokenToSell, setTokenToSell] = useState("");
  const [tokenToBuy, setTokenToBuy] = useState("");
  const [amountToSell, setAmountToSell] = useState("");
  const [amountToBuy, setAmountToBuy] = useState("");
  const [minTradeAmount, setMinTradeAmount] = useState("0");
  const [maxTradeAmount, setMaxTradeAmount] = useState("0");
  const [timelock, setTimelock] = useState(0);

  // Mock data for demonstration
  const mockOrders = useReadContract({
    address,
    abi,
    functionName: 'getOrderBook',
    args: [tokenToBuy, tokenToSell]
  });
  console.log(mockOrders.data);
  const orders = [];

  const handlePartialFilled = (e: React.SyntheticEvent) => {
    setPartialFill(e.target.checked);
  };

  const handleTokenToSellChange = (token: string) => {
    setTokenToSell(token);
  };

  const handleTokenToBuyChange = (token: string) => {
    setTokenToBuy(token);
  };
  
  return (
    <div className="container flex flex-col mx-auto gap-2 px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {/* Order Book */}
        <div className="md:col-span-2 bg-white rounded-lg shadow-md">
          <div className="p-4 border-b ">
            <div className="flex items-center justify-between">
              <h2 className="px-10 text-xl font-bold text-black">
                Order Book
              </h2>
              <div className='flex text-black gap-1'>
                <select
                  className="w-1/2 px-1 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  onChange={(e) => handleTokenToSellChange(e.target.value)}
                >
                  {Object.keys(tokenOptions).map((token) => (
                    <option key={token} value={tokenOptions[token]}>
                      {token}
                    </option>
                  ))}
                </select>
                <div className='text-5xl mt-2'><ArrowRightLeft /></div>
                <select
                  className="w-1/2 px-1 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  onChange={(e) => handleTokenToBuyChange(e.target.value)}
                >
                  {Object.keys(tokenOptions).map((token,index) =>{
                    return(
                      index==1 ? <option key={token} value={tokenOptions[token]} selected>
                      {token}
                    </option>:<option key={token} value={tokenOptions[token]} >
                    {token}
                      </option>
                    )
                  }
                  )}
                </select>
              </div>
            </div>
          </div>
          <div className="p-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left bg-gray-50 text-gray-600">
                    <th className="p-3">Price</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">MAX/MIN</th>
                    <th className="p-3">Expiry</th>
                    <th className="p-3">Timelock</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody className='text-gray-500'>
                  <Orders />
                  {/* {mockOrders.data?.map((order) => (
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
                  ))} */}
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
            <form className="space-y-4" onSubmit={(e: React.FormEvent) => {
              e.preventDefault();

              writeContract({
                address,
                abi,
                functionName: 'createOrder',
                args: [
                  tokenToSell,
                  tokenToBuy,
                  parseEther(amountToSell),
                  parseEther(amountToBuy),
                  parseEther(minTradeAmount),
                  parseEther(maxTradeAmount),
                  partialFill,
                  BigInt(timelock)
                ],
                value: parseEther("0")
              });
            }}>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-600">
                  I want to sell
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="w-1/2 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    placeholder="Amount"
                    onChange={(e) => setAmountToSell((e.target.value))}
                  />
                  <select
                    className="w-1/2 px-1 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    onChange={(e) => handleTokenToSellChange(e.target.value)}
                  >
                    <option value="">Select Token A</option>
                    {Object.keys(tokenOptions).map((token) => (
                      <option key={token} value={tokenOptions[token]}>
                        {token}
                      </option>
                    ))}
                  </select>
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
                    onChange={(e) => setAmountToBuy((e.target.value))}
                  />
                  <select
                    className="w-1/2 px-1 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    onChange={(e) => handleTokenToBuyChange(e.target.value)}
                  >
                    <option value="">Select Token B</option>
                    {Object.keys(tokenOptions).map((token) => (
                      <option key={token} value={tokenOptions[token]}>
                        {token}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {partialFill &&
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-600">
                      Min Trade
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Min amount"
                      onChange={(e) => setMinTradeAmount((e.target.value))}
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
                      onChange={(e) => setMaxTradeAmount((e.target.value))}
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
                  onChange={(e) => setTimelock(Math.floor(new Date(e.target.value).getTime() / 1000))}
                />
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="partial" onChange={handlePartialFilled} />
                <label htmlFor="partial" className="text-sm text-gray-600">
                  Allow partial fills
                </label>
              </div>

              <Button type="submit" className="w-full flex items-center justify-center" >
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