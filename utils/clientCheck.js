import { useWalletClient, useNetwork } from "wagmi";

const NEXT_PUBLIC_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
const NEXT_PUBLIC_TEST_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_TEST_CONTRACT_ADDRESS;

const useClientCheck = () => {
  const { data: WalletClient } = useWalletClient();
  const { chain } = useNetwork();

  let network = null;
  let contract = NEXT_PUBLIC_CONTRACT_ADDRESS;
  let prefix = "";

  if (WalletClient && chain) {
    switch (chain.id) {
      case 80001: // Mumbai
        network = 'mumbai';
        contract = NEXT_PUBLIC_TEST_CONTRACT_ADDRESS;
        prefix = "testnets.";
        break;
      default:
        network = 'notmumbai';
        contract = NEXT_PUBLIC_CONTRACT_ADDRESS;
        prefix = "";
        break;
    }
  }

  return { network, contract, prefix, WalletClient };
};

export default useClientCheck;
