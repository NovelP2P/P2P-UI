"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Camera, Clock } from 'lucide-react';
import { useReadContract, useWriteContract } from 'wagmi';
import { abi, address } from "@/app/utils/abi";
import { parseEther } from 'viem';

const SwapPage = ({orderId}:{orderId:number}) => {
  const [amount, setAmount] = useState('');
  const [timelock, setTimelock] = useState(0);
    const {data:order} = useReadContract({
        address,
        abi,
        functionName:"orders",
        args:[BigInt(orderId)]
    })
    const orderReceived = Array.isArray(order)?order:[];

    console.log(order);
    const {writeContract} = useWriteContract();
  const handleSwap = () => {
    // Implement your swap logic here
    console.log(`Initiating swap for order: ${orderId}, amount: ${amount}, timelock: ${timelock}`);
    console.log(BigInt(orderId),parseEther(amount),orderReceived[10],BigInt(timelock))
    writeContract({
      address,
      abi,
      functionName:"initiateSwap",
      args:[BigInt(orderId),parseEther(amount),orderReceived[10],BigInt(timelock)]
    })
  };

  console.log(orderId);
  return (
    <div className="flex justify-center items-center h-screen text-gray-700">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-xl min-h-[60vh] flex flex-col justify-center gap-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Initiate Swap</h2>
        </div>
        <div className="space-y-6">
          <div>
            <label htmlFor="amount" className="block font-medium mb-2">
              Amount
              <div className="relative">
                <input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2"
                  placeholder="Enter amount to swap"
                />
                
              </div>
            </label>
          </div>
          <div>
            <label htmlFor="timelock" className="block font-medium mb-2">
              =Expiry Time
              <div className="relative">
                <input
                  id="timelock"
                  type="datetime-local"
                  onChange={(e) => setTimelock(Math.floor(new Date(e.target.value).getTime()/1000))}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2"
                />
            
              </div>
            </label>
          </div>
          <button
            onClick={handleSwap}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Initiate Swap
          </button>
        </div>
      </div>
    </div>
  );
};

export default SwapPage;