import { useWalletClient } from "wagmi";

const NEXT_PUBLIC_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
const NEXT_PUBLIC_TEST_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_TEST_CONTRACT_ADDRESS;

const useClientCheck = () => {
  const { data: WalletClient } = useWalletClient();

  let network = "mumbai"; //matic
  let contract = NEXT_PUBLIC_CONTRACT_ADDRESS;
  let prefix = "testnets."; //""

  if (WalletClient) {
    if (WalletClient.chain.id === 80001) {
      network = 'mumbai';
      contract = NEXT_PUBLIC_TEST_CONTRACT_ADDRESS;
      prefix = "testnets.";
    }
  }

  return { network, contract, prefix, WalletClient };
};

export default useClientCheck;
