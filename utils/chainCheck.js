'use client'
import { useWalletClient } from "wagmi";

const NEXT_PUBLIC_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
const NEXT_PUBLIC_TEST_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_TEST_CONTRACT_ADDRESS;

const useChainCheck = () => {
  const { data: WalletClient } = useWalletClient();

  let network = "matic";
  let contract = NEXT_PUBLIC_CONTRACT_ADDRESS;
  let prefix = "";

  if (WalletClient) {
    if (WalletClient.chain.id === 80001) {
      network = 'mumbai';
      contract = NEXT_PUBLIC_TEST_CONTRACT_ADDRESS;
      prefix = "testnets.";
    }
  }

  return { network, contract, prefix, WalletClient };
};

export default useChainCheck;
