import React, { useState } from 'react';
import { ArrowRightLeft, Plus } from 'lucide-react';
import { useWaitForTransactionReceipt,useWriteContract, useReadContract } from 'wagmi';
import { parseEther } from 'viem';
import { abi, address,erc20abi } from "@/app/utils/abi";
import Orders from './Orders';

// Token options
const tokenOptions = {
  USDC: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
  WETH: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
  DAI: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
  LINK: '0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39',
  MTK1:'0x38d6939b75a29119CC1b1E317Ff7bcfa58a7e198',
  MTK2:'0xC485a8fE828e730EaDCBEB432eF5937dFD5b471a',
  MST:'0xBddbaC11418Bf2Cc1B9c995076775910b580d81c',
  SKY:'0x5f7943c5Dc9b0c81dC0CAfE1Dcc3579f924B5C7f',
  RTK1:"0xeb88a8425bEDE672dcB7224ecA973478A8c5413a",
  RTK2:"0xd6EECddC1695cbc43982e14Cc33aEcaE27d824B6"
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
  const { data: hash,isPending, writeContract } = useWriteContract();
  const [tokenA, setTokenA] = useState("");
  const [tokenB, setTokenB] = useState("");
  const [partialFill, setPartialFill] = useState(false);
  const [tokenToSell, setTokenToSell] = useState("");
  const [tokenToBuy, setTokenToBuy] = useState("");
  const [amountToSell, setAmountToSell] = useState("");
  const [amountToBuy, setAmountToBuy] = useState("");
  const [hashlock, setHashlock] = useState("");
  const [minTradeAmount, setMinTradeAmount] = useState("0");
  const [maxTradeAmount, setMaxTradeAmount] = useState("0");
  const [timelock, setTimelock] = useState(0);

  // Mock data for demonstration
  const mockOrders = useReadContract({
    address,
    abi,
    functionName: 'getOrderBook',
    args: [tokenA, tokenB]
  });
  console.log("token",tokenA,tokenB)
  console.log("mockdata",mockOrders.data);

  const handlePartialFilled = (e: React.SyntheticEvent) => {
    setPartialFill(e.target.checked);
  };

  const handleTokenToSellChange = (token: string) => {
    setTokenToSell(token);
  };

  const handleTokenToBuyChange = (token: string) => {
    setTokenToBuy(token);
  };
  
  const handleFormSubmit = (e: React.FormEvent) => {
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
            BigInt(timelock),
            hashlock
          ]
      });
  
      console.log('Order created');
  };

  // const approve=(e: React.FormEvent)=>{
  //   e.preventDefault();
  //   writeContract({
  //     address: tokenToSell,
  //     abi: erc20abi,
  //     functionName: 'approve',
  //     args: [address, parseEther(amountToSell)]
  //   });
  // }
  
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
                  onChange={(e) => setTokenA(e.target.value)}
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
                  onChange={(e) => setTokenB(e.target.value)}
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
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody className='text-gray-500'>
                  {
                    mockOrders.data?.map((orderId:BigInt)=>{
                      console.log("order",orderId)
                      return(
                        <Orders key={orderId} id={orderId}/>
                      )
                    }
                      
                    )
                  }
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
            <form className="space-y-4" onSubmit={handleFormSubmit}>
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
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                      placeholder="Min amount"
                      onChange={(e) => setMinTradeAmount((e.target.value))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-600 ">
                      Max Trade
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
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
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  onChange={(e) => setTimelock(Math.floor(new Date(e.target.value).getTime() / 1000))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-600">
                  Secret Hash
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  onChange={(e) => setHashlock(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="partial" onChange={handlePartialFilled} />
                <label htmlFor="partial" className="text-sm text-gray-600">
                  Allow partial fills
                </label>
              </div>
              <div className='flex gap-1'>
              {/* <Button className="w-1/2 flex items-center justify-center" onClick={approve}>
                Approve
              </Button> */}
              <Button className="w-full flex items-center justify-center" type="submit">
                <Plus className="w-4 h-4 mr-2" />
                Create Order
              </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderBookPage;