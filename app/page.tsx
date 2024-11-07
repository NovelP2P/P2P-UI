import Link from 'next/link'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-36">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold mb-4 text-black">
          Trustless P2P Token Swaps
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Trade tokens directly with other users using hash time locked contracts
        </p>
        <div className="flex justify-center gap-4">
          <Link 
            href="/orderbook"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            View Order Book
          </Link>
          <Link 
            href="/orderbook"
            className="px-6 py-3 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Create Order
          </Link>
        </div>
      </div>
    </div>
  )
}