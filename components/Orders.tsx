import React from 'react'
import { abi, address } from "@/app/utils/abi";
import { useReadContract } from 'wagmi';
import Link from 'next/link';
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
const Orders = ({id}:{id:BigInt}) => {
    const tokenOptions = {
        '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174':"USDC",
        '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619':"WETH",
        '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063':"DAI",
        '0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39':"LINK",
        '0x38d6939b75a29119CC1b1E317Ff7bcfa58a7e198':"MTK1",
        '0xC485a8fE828e730EaDCBEB432eF5937dFD5b471a':"MTK2",
        '0x5f7943c5Dc9b0c81dC0CAfE1Dcc3579f924B5C7f':"SKY",
        "0xBddbaC11418Bf2Cc1B9c995076775910b580d81c":"MST",
        "0xeb88a8425bEDE672dcB7224ecA973478A8c5413a":"RTK1",
        "0xd6EECddC1695cbc43982e14Cc33aEcaE27d824B6":"RTK2"
      };
    console.log(id)
    const orders= useReadContract({
        address,
        abi,
        functionName:'orders',
        args:[id]
    })
    const orderArray = Array.isArray(orders.data)?orders.data:[]
    console.log(orderArray);
    const token= tokenOptions[orderArray[2]];
  return (
    <>
      <tr>
        <td className="p-3">{parseFloat(orderArray[4]/orderArray[5])} {token}</td>
        <td className="p-3">{Number(orderArray[4])/10**18}</td>
        <td className="p-3">{Number(orderArray[7])/10**18}/{Number(orderArray[6])/10**18}</td>
        <td className="p-3">{new Date(Number(orderArray[9])*1000).toDateString()}</td>
        <td className="p-3">
            <Link href={`/swap/${id}`}>
                <Button className=''>Take order</Button>
            </Link>
        </td>
      </tr>
    </>
  )
}

export default Orders
