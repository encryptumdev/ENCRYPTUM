import React from "react";

import Web3ContextProvider from "@/utilities/web3/web3.context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import dynamic from "next/dynamic";
import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet } from "wagmi/chains";

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}

const projectId = "1a3f75f5d151c2ca7c841834c0e749c1";

export const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [
      // telosTestnet,
      mainnet,
    ],
    transports: {
      // RPC URL for each chain
      // [telosTestnet.id]: http(),
      [mainnet.id]: http("https://ethereum-rpc.publicnode.com"),
    },
    // Required API Keys
    walletConnectProjectId: projectId,
    // Required App Info
    appName: "Encryptum",
  })
);

const queryClient = new QueryClient();

const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>
          <Web3ContextProvider>{children}</Web3ContextProvider>
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default dynamic(() => Promise.resolve(Web3Provider), { ssr: false });
