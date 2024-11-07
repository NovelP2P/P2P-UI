"use client"
import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet, sepolia} from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

export const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [mainnet,sepolia],
    transports: {
      // RPC URL for each chain
      [mainnet.id]: http(),
      [sepolia.id]:http()
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