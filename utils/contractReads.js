import { useState, useEffect } from 'react';
import { useContractReads } from 'wagmi';
import contractABI from "../contracts/FreedomOfSpeech.json";

export const useContractReadLoop = (contract, functionName, tokenData) => {
  const [list, setList] = useState([]);

  // Set the list state whenever tokenData changes
  useEffect(() => {
    setList(tokenData.map(token => ({
      address: contract,
      abi: contractABI,
      functionName: functionName,
      args: token.tokenId
    })));
  }, [tokenData, contract, functionName]);

  const { data, isError, isLoading } = useContractReads({ contracts: list });

  // Handle error state here if necessary

  return data?.map(item => item.result);
};
