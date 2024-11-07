"use client"

export default function Swaps() {
    const swaps=[{
        swapId:0,
        orderId:1,
        initiator:"0xbBe46d87139BaFF33854E0dFd0dc73bE7dF9CE35",
        participant:"0xc886E3974Eb90B44AB91e13e5F46A085d8cF150D",
        initiatorToken:"0xBddbaC11418Bf2Cc1B9c995076775910b580d81c",
        participantToken:"",
        initiatorAmount:100,
        participantAmount:1000,
        hashlock:"xyz@1976",
        timelock:1716281,
        status:0
    }]
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-black">Active Swaps</h2>
        </div>
        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left bg-gray-50 text-gray-600">
                  <th className="p-3">Swap ID</th>
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Send</th>
                  <th className="p-3">Receive</th>
                  <th className="p-3">Counterparty</th>
                  <th className="p-3">Expires</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Add swap data here */}
                
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}