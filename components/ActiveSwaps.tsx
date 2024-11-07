import React, { useState } from 'react';
import { useReadContract, useWriteContract } from 'wagmi';
import { address, abi } from "@/app/utils/abi";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
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

const ActiveSwaps = ({id}: {id: BigInt[]}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [secretKey, setSecretKey] = useState('');
  
  const swap = useReadContract({
    address,
    abi,
    functionName: 'getSwapBySwapId',
    args: [id]
  });

  const handleVerifyClick = () => {
    setIsModalOpen(true);
  };
  const { data: hash,isPending, writeContract } = useWriteContract();
  
  const handleModalVerify = () => {
    // Here you can add logic to handle the secret key
    console.log('Secret Key:', secretKey);
    setIsModalOpen(false);
    setSecretKey(''); // Reset the secret key after closing
    writeContract({
      address, 
      abi,
      functionName:'completeSwap',
      args:[id,secretKey]
    })
  };

  return (
    <>
      <tr className='text-black'>
        <td className="p-3">{swap.data?.swapId}</td>
        <td className="p-3">{swap.data?.orderId}</td>
        <td className="p-3">{swap.data?.participant}</td>
        <td className="p-3">{Number(swap.data?.participantAmount)/10**18}</td>
        <td className="p-3">
          {new Date(Number(swap.data?.timelock)*1000).toDateString()}
        </td>
        <td className="p-3">
          <Button onClick={handleVerifyClick}>
            Verify
          </Button>
        </td>
      </tr>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Enter Secret Key</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              placeholder="Enter your secret key"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
            <div className="flex justify-end gap-3">
              <Button 
                variant="secondary" 
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleModalVerify}
                disabled={!secretKey.trim()}
              >
                Verify
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ActiveSwaps;