import { useContractRead } from "wagmi";
import contractABI from "../contracts/FreedomOfSpeech.json";
import useClientCheck from "./clientCheck";
  
function useContractReadSingle({ readFunctionName }) {
    //added for use of multiple networks
    //const { contract: contract } = useClientCheck(); 

    const { data: data } = useContractRead({
        address: process.env.NEXT_PUBLIC_TEST_CONTRACT_ADDRESS, //contract
        abi: contractABI,
        functionName: readFunctionName,
    });
    
    return data
}

export default useContractReadSingle;
