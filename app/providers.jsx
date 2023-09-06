'use client';

import * as React from 'react';
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
  darkTheme
} from '@rainbow-me/rainbowkit';
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { alchemyProvider } from 'wagmi/providers/alchemy'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    polygonMumbai,
  ],
  [alchemyProvider({apiKey: 'rd2bVW5q6KmYyjP7uic2SgINXEBb2fKx'}), publicProvider()]
);

const projectId = 'bcdee4db8a6a9d881ea7c895f57b2413';

const { wallets } = getDefaultWallets({
  appName: 'FoSWall',
  projectId,
  chains,
});

const AppInfo = {
  appName: 'FoSWall',
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Other',
    wallets: [
      argentWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export function Providers({ children }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider coolMode chains={chains} appInfo={AppInfo} theme={darkTheme()}>
        {mounted && children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}