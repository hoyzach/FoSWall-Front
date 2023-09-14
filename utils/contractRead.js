import { useContractRead } from "wagmi";
import contractABI from "../contracts/FreedomOfSpeech.json";
import useClientCheck from "./clientCheck";
  
function useContractReadSingle({ readFunctionName }) {
    const { contract: contract } = useClientCheck();

    const { data: data } = useContractRead({
        address: contract,
        abi: contractABI,
        functionName: readFunctionName,
    });
    
    return data
}

export default useContractReadSingle;
