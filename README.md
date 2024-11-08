# P2P Swapping Platform

This project introduces a peer-to-peer (P2P) swapping platform that uses cryptographic security through password hashing and a time-based mechanism to create a secure and flexible environment for asset trading. By adopting an order book-based architecture rather than a traditional automated market maker (AMM), this system provides users with a decentralized way to trade assets directly.

For accessing the contracts [click here]("https://github.com/NovelP2P/Contracts")  
For project project working demo [click here]("https://www.loom.com/share/ceb472400a95443c85f0d50646595f90") 
## Features

### Order Book-Based Swapping
- **Direct Trading**: Users place buy and sell orders directly, specifying the price and amount, without depending on an AMM or liquidity pools.
- **No Liquidity Pool Requirement**: Trades occur directly between users, reducing slippage and price impact and avoiding centralized liquidity pools.

### Password-Based Cryptographic Security
- **Secure Password Hashing**: Each trade is protected through cryptographic password hashing, ensuring that only parties with the correct credentials can initiate and complete the transaction.
- **Enhanced Security**: The hashed password creates a unique identifier for each transaction, making it impossible for unauthorized users to access the trade.

### Time-Lock Mechanism
- **Timed Security**: Each trade must complete within a specific time frame. If either party fails to fulfill their part of the trade within this period, the assets are returned to their original owners, minimizing counterparty risk.
- **User-Defined Timelocks**: Users can set custom time-lock durations, allowing them to control transaction timelines based on their needs.

### Partial Swaps
- **Flexible Trading Options**: The platform allows users to trade only a portion of their assets, offering flexibility for smaller trades or gradual execution of larger trades.
- **Efficient Liquidity Management**: Partial swaps allow users to adjust their trades according to market conditions and personal preferences, creating a more dynamic and user-friendly experience.

## How It Works

1. **Order Placement**: Users create buy or sell orders on the order book, specifying asset type, quantity, price, and a hashed password for security.
2. **Trade Matching**: When the second user agrees to the trade, the secret hash is shared with him and with this secret hash a swap is initiated  
3. **Trade Verification**: The order maker can see the swaps in active swaps and verify the trade by providing the preimage of the secret hash which then again gets hashed in contract and checked against the hash send by the second user through swap.
4. **Swap Complete**: Once the trade is verified, both the tokens get swapped among the parties involved.  
5. **Time-Lock Activation**: Each transaction is bound by a time-lock, requiring completion within the set period. If time expires, the assets are automatically returned to the original owners.
6. **Partial Swap Execution**: Users can choose to trade only a portion of their assets, allowing for incremental or smaller trades for added flexibility.

## Benefits

- **Decentralized Control**: Users have full control over trade terms, prices, and amounts.
- **Enhanced Security**: Password hashing ensures that only authorized users can access and complete trades, while time-locks add an additional layer of protection.
- **Flexibility and Efficiency**: The order book model and support for partial swaps cater to various trading preferences and strategies.

## Getting Started

### Prerequisites
- Node.js
- A compatible wallet (e.g., MetaMask) for interacting with the platform
- Testnet Tokens(Ethereum Sepolia, Unichain Sepolia Testnet)
### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/NovelP2P/P2P-UI
   cd P2P-UI
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Usage

- **Run the Platform**:
   ```bash
   npm run dev
   ```
- **Place Orders**: Access the order book to create buy/sell orders with password-protected security.
- **Execute Trades**: Initiate and complete trades with password hashing and optional time-locks.
- **Partial Swaps**: Choose the amount to trade, allowing fractional asset swaps.
