import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { WagmiProvider } from 'wagmi';
import { bscTestnet } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

// Configure for BSC Testnet
const config = getDefaultConfig({
  appName: 'BNB-Voice',
  projectId: 'e7fa7d19fd057ecd9403a0e89bd62b8b', // Your project ID
  chains: [bscTestnet],
  ssr: false
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
);
