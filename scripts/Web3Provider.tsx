"use client"
import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet, sepolia, unichainSepolia} from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
console.log("unichain id",unichainSepolia)
export const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [sepolia,unichainSepolia],
    transports: {
      // RPC URL for each chain
	  [sepolia.id]:http(),
      [unichainSepolia.id]:http(`https://unichain-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`)
    },

    // Required API Keys
    walletConnectProjectId: "906cb73ee0023b622352d77887b2be41",

    // Required App Info
    appName: "Novel Swap",

    // Optional App Info
    appDescription: "Your App Description",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  }),
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }:{children:React.ReactElement}) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};


[
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "orderId",
				"type": "uint256"
			}
		],
		"name": "cancelOrder",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "swapId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "preimage",
				"type": "string"
			}
		],
		"name": "completeSwap",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_tokenToSell",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_tokenToBuy",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amountToSell",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_amountToBuy",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_minTradeAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_maxTradeAmount",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "_partialFillAllowed",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "_timelock",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_preImage",
				"type": "string"
			}
		],
		"name": "createOrder",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "orderId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "takeAmount",
				"type": "uint256"
			},
			{
				"internalType": "bytes32",
				"name": "hashlock",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "timelock",
				"type": "uint256"
			}
		],
		"name": "initiateSwap",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "orderId",
				"type": "uint256"
			}
		],
		"name": "OrderCancelled",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "orderId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "maker",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "tokenToSell",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "tokenToBuy",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amountToSell",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amountToBuy",
				"type": "uint256"
			}
		],
		"name": "OrderCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "orderId",
				"type": "uint256"
			}
		],
		"name": "OrderUpdated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "swapId",
				"type": "uint256"
			}
		],
		"name": "refundSwap",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "swapId",
				"type": "uint256"
			}
		],
		"name": "SwapCompleted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "swapId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "orderId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "participant",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "initiatorAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "participantAmount",
				"type": "uint256"
			}
		],
		"name": "SwapInitiated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "swapId",
				"type": "uint256"
			}
		],
		"name": "SwapRefunded",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "_swapIds",
		"outputs": [
			{
				"internalType": "uint64",
				"name": "",
				"type": "uint64"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "tokenA",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "tokenB",
				"type": "address"
			}
		],
		"name": "getOrderBook",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "initiator",
				"type": "address"
			}
		],
		"name": "getOrderByInitiator",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "orderId",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "maker",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "tokenToSell",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "tokenToBuy",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "amountToSell",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "amountToBuy",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "minTradeAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "maxTradeAmount",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "partialFillAllowed",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "timelock",
						"type": "uint256"
					},
					{
						"internalType": "bytes32",
						"name": "hashlock",
						"type": "bytes32"
					},
					{
						"internalType": "bool",
						"name": "isActive",
						"type": "bool"
					},
					{
						"internalType": "bytes32[]",
						"name": "activeSwaps",
						"type": "bytes32[]"
					}
				],
				"internalType": "struct P2PHTLCSwap.Order[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "orderId",
				"type": "uint256"
			}
		],
		"name": "getOrderByOrderId",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "orderId",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "maker",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "tokenToSell",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "tokenToBuy",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "amountToSell",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "amountToBuy",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "minTradeAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "maxTradeAmount",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "partialFillAllowed",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "timelock",
						"type": "uint256"
					},
					{
						"internalType": "bytes32",
						"name": "hashlock",
						"type": "bytes32"
					},
					{
						"internalType": "bool",
						"name": "isActive",
						"type": "bool"
					},
					{
						"internalType": "bytes32[]",
						"name": "activeSwaps",
						"type": "bytes32[]"
					}
				],
				"internalType": "struct P2PHTLCSwap.Order",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "swapId",
				"type": "uint256"
			}
		],
		"name": "getSwapBySwapId",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "swapId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "orderId",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "initiator",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "participant",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "initiatorToken",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "participantToken",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "initiatorAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "participantAmount",
						"type": "uint256"
					},
					{
						"internalType": "bytes32",
						"name": "hashlock",
						"type": "bytes32"
					},
					{
						"internalType": "uint256",
						"name": "timelock",
						"type": "uint256"
					},
					{
						"internalType": "enum P2PHTLCSwap.SwapStatus",
						"name": "status",
						"type": "uint8"
					}
				],
				"internalType": "struct P2PHTLCSwap.Swap",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "getUserOrders",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "orderBook",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "orders",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "orderId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "maker",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "tokenToSell",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "tokenToBuy",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amountToSell",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amountToBuy",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "minTradeAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "maxTradeAmount",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "partialFillAllowed",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "timelock",
				"type": "uint256"
			},
			{
				"internalType": "bytes32",
				"name": "hashlock",
				"type": "bytes32"
			},
			{
				"internalType": "bool",
				"name": "isActive",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "orderToSwap",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "swaps",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "swapId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "orderId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "initiator",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "participant",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "initiatorToken",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "participantToken",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "initiatorAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "participantAmount",
				"type": "uint256"
			},
			{
				"internalType": "bytes32",
				"name": "hashlock",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "timelock",
				"type": "uint256"
			},
			{
				"internalType": "enum P2PHTLCSwap.SwapStatus",
				"name": "status",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "userOrders",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]