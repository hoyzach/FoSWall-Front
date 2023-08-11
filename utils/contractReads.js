import { useState, useEffect } from 'react';
import { useContractReads } from 'wagmi';
import contractABI from "../contracts/FreedomOfSpeech.json";

export const useContractReadLoop = (contract, functionName, tokenData, refresh) => {
  const [list, setList] = useState([]);

  // Set the list state whenever tokenData changes
  useEffect(() => {
    setList(tokenData.map(token => ({
      address: contract,
      abi: contractABI,
      functionName: functionName,
      args: [token.tokenId],
    })));
  }, [tokenData, contract, functionName, refresh]);

  const { data, isError, isLoading } = useContractReads({ contracts: list, watch: true });

  return data?.map(item => item.result);
};
