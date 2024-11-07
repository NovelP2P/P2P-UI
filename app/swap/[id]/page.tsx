import SwapPage from '@/components/Swappage'
import { useRouter } from 'next/router';
import React from 'react'

const page = async ({params}:{params:{id:Promise<number>}}) => {
  const id = await params.id;
  return (
    <div>
        <SwapPage orderId={id}/>
    </div>
  )
}
export default page;