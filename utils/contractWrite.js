import { useContractWrite, useWaitForTransaction } from "wagmi";
import { useEffect } from "react";
import contractABI from "../contracts/FreedomOfSpeech.json";
import useClientCheck from "./clientCheck";
import toast from 'react-hot-toast';

function contractWrite({ writeFunctionName }) {

    const { contract: contract, WalletClient: signer } = useClientCheck();

    // Write function call structure
    let actionData, contractAction, isActionLoading, isActionStarted, actionError, actionTxSuccess, actionTxError, executeAction;
    
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
        toast.loading('Transaction is pending...');
        if (args) {
          contractAction({
              args: [args],
              signer: signer
          });
        }
        else {
          contractAction({
            signer: signer
        });
        }
    }

    // Action logging
    useEffect(() => {
        console.log(`actionData:`, actionData);
        console.log(`is${writeFunctionName}Loading:`, isActionLoading);
        console.log(`is${writeFunctionName}Started:`, isActionStarted);
        console.log(`${writeFunctionName}Error:`, actionError);
        console.log("___________");
    }, [actionData, isActionLoading, isActionStarted]);

    // Check TX for action function
    ({ isSuccess: actionTxSuccess, error: actionTxError } = useWaitForTransaction({
        confirmations: 3,
        hash: actionData?.hash,
        }));

    useEffect(() => {
        if (actionError) {
          toast.dismiss();
          if (actionError.cause.details){
            toast.error(actionError.cause.details)
          } else { toast.error(actionError.cause.reason) }
        }
      }, [actionError]);

    useEffect(() => {
        if (actionTxSuccess) {
          toast.dismiss();
          // Show a success toast when the transaction is successful
          toast.success(`${writeFunctionName} successful!`);
        }
      }, [actionTxSuccess]);

    return {
        executeAction: executeAction,
        actionTxSuccess: writeFunctionName ? actionTxSuccess : undefined,
        isActionLoading: writeFunctionName ? isActionLoading : undefined
    };
}

export default contractWrite;
  