import React, { ButtonHTMLAttributes, useState } from 'react';
import { useReadContract, useWatchContractEvent, useWriteContract } from 'wagmi';
import { address, abi } from "@/app/utils/abi";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import toast from 'react-hot-toast';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';  // add any other variants you have
  className?: string;
}

interface swapProps{
  swapId:BigInt,
  orderId:BigInt,
  participant:string,
  participantAmount:BigInt,
  timelock:BigInt,
  status:number
}

const Button = ({ children, variant = 'primary', className = '', ...props }:ButtonProps) => {
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
  
  const {data:swap} = useReadContract({
    address,
    abi,
    functionName: 'getSwapBySwapId',
    args: [id]
  }) as {data:swapProps};
console.log(swap);
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
  useWatchContractEvent({
    address,
    abi,
    eventName:"SwapCompleted",
    onLogs(logs){
      toast.success("Swap Completed!!")
    }
  })
  return (
    <>
    {swap?.status==1 &&
      <tr className='text-black'>
        <td className="p-3">{swap?.swapId.toString()}</td>
        <td className="p-3">{swap?.orderId.toString()}</td>
        <td className="p-3">{swap?.participant.toString()}</td>
        <td className="p-3">{Number(swap?.participantAmount)/10**18}</td>
        <td className="p-3">
          {new Date(Number(swap?.timelock)*1000).toDateString()}
        </td>
        <td className="p-3">
          <Button onClick={handleVerifyClick}>
            Verify
          </Button>
        </td>
      </tr>
    } 
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