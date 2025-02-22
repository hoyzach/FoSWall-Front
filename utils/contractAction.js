import {
    useContractRead,
    useContractWrite,
    useWaitForTransaction,
  } from "wagmi";
  import { useState, useEffect } from "react";
  import contractABI from "../contracts/FreedomOfSpeech.json";
  import useClientCheck from "./clientCheck";
  import toast from 'react-hot-toast';
  
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
        // console.log(`calling ${readFunctionName}`);
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
      executeAction = async (args) => {
        // Show loading toast without awaiting success or error
        toast.success(`${writeFunctionName} submitted!`);
        contractAction({
          args: [args],
          value: readData,
          signer: signer
        });
      };

    //   // Action logging
    //   useEffect(() => {
    //     console.log("___________");
    //     console.log(`actionData:`, actionData);
    //     console.log(`is${writeFunctionName}Loading:`, isActionLoading);
    //     console.log(`is${writeFunctionName}Started:`, isActionStarted);
    //     console.log(`${writeFunctionName}Error:`, actionError);
    //     console.log("___________");
    //   }, [actionData, isActionLoading, isActionStarted]);
    }
    
    useEffect(() => {
      if (actionError) {
        toast.dismiss();
        if (actionError.cause.details && actionError.cause.details.includes("insufficient funds for gas")) {
          toast.error('Insufficent funds for gas');
        } else if (actionError.cause.details) {
          toast.error(actionError.cause.details);
        } else {
          toast.error(actionError.cause.reason);
        }
      }
    }, [actionError]);
  
    return {
      executeAction: executeAction,
      readData,
      isActionLoading: writeFunctionName ? isActionLoading : undefined,
      actionTxSuccess: writeFunctionName ? actionTxSuccess : undefined,
    };
  }
  
  export default useContractAction;
  