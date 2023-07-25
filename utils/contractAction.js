import {
    useContractRead,
    useContractWrite,
    useWaitForTransaction,
  } from "wagmi";
  import { useState, useEffect } from "react";
  import contractABI from "../contracts/FreedomOfSpeech.json";
  import useClientCheck from "./clientCheck";
  
  function useContractAction({ readFunctionName, writeFunctionName }) {
    const [readData, setReadData] = useState(0);
  
    const { contract: contract, WalletClient: signer } = useClientCheck();
  
    // Read function call structure
    const { data: data } = useContractRead({
      address: contract,
      abi: contractABI,
      functionName: readFunctionName,
      watch: true,
    });
  
    useEffect(() => {
      if (data) {
        setReadData(data);
        console.log(`calling ${readFunctionName}`);
      }
    }, [data]);
  
    // Write function call structure
    let actionData, contractAction, isActionLoading, isActionStarted, actionError, actionTxSuccess, actionTxError, executeAction;
    if (writeFunctionName) {
      ({
        data: actionData,
        write: contractAction,
        isLoading: isActionLoading,
        isSuccess: isActionStarted,
        error: actionError,
      } = useContractWrite({
        address: contract,
        abi: contractABI,
        functionName: writeFunctionName,
      }));
  
      // Write function call
      executeAction = async (args) => {  // define here
        contractAction({
          args: [args],
          value: readData,
          signer: signer
        });
      }
  
      // Action logging
      useEffect(() => {
        console.log("___________");
        console.log(`actionData:`, actionData);
        console.log(`is${writeFunctionName}Loading:`, isActionLoading);
        console.log(`is${writeFunctionName}Started:`, isActionStarted);
        console.log(`${writeFunctionName}Error:`, actionError);
        console.log("___________");
      }, [actionData, isActionLoading, isActionStarted]);
  
      // Check TX for action function
      ({ isSuccess: actionTxSuccess, error: actionTxError } = useWaitForTransaction({
        confirmations: 1,
        hash: actionData?.hash,
      }));
    }
  
    return {
      executeAction: executeAction,
      readData,
      isActionLoading: writeFunctionName ? isActionLoading : undefined,
      actionTxSuccess: writeFunctionName ? actionTxSuccess : undefined,
      actionTxError: writeFunctionName ? actionTxError : undefined
    };
  }
  
  export default useContractAction;
  