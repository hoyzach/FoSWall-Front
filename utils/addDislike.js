import {
    useAccount,
    useContractRead,
    useContractWrite,
    useNetwork,
    useWalletClient,
    useWaitForTransaction,
  } from "wagmi";
  import { useState, useEffect } from "react";
  import contractABI from "../contracts/FreedomOfSpeech.json";
  
  const NEXT_PUBLIC_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
  
  export default function useAddDislike() {
    const [dislikeFee, setDislikeFee] = useState(0);
  
    const { address } = useAccount();
    const { chains } = useNetwork();
    const { data: WalletClient } = useWalletClient();
  
    //dislikeFee function call structure
    const { data: dislikeFeeData } = useContractRead({
      address: NEXT_PUBLIC_CONTRACT_ADDRESS,
      abi: contractABI,
      functionName: "dislikeFee",
      watch: true,
    });
  
    useEffect(() => {
      if (dislikeFeeData) {
        setDislikeFee(dislikeFeeData);
        console.log("calling dislikeFee")
      }
    }, [dislikeFeeData]);
  
    //addDislike function call structure
    const {
      data: addDislikeData,
      write: dislikeToken,
      isLoading: isAddDislikeLoading,
      isSuccess: isAddDislikeStarted,
      error: addDislikeError,
    } = useContractWrite({
      address: NEXT_PUBLIC_CONTRACT_ADDRESS,
      abi: contractABI,
      functionName: "addDislike",
    });
  
  
    //addDislike function call
    const addDislike = async (tokenId) => {
      dislikeToken({
        args: [tokenId],
        value: dislikeFee,
        signer: WalletClient
      });
    }
  
    //addDislike logging
    useEffect(() => {
      console.log("addDislikeData:", addDislikeData);
      console.log("isAddDislikeLoading:", isAddDislikeLoading);
      console.log("isAddDislikeStarted", isAddDislikeStarted);
      console.log("addDislikeError:", addDislikeError);
      console.log("___________");
    }, [addDislikeData, isAddDislikeLoading, isAddDislikeStarted]);
  
    //check TX for dislike function
    const { isSuccess: dislikeTxSuccess, error: dislikeTxError } = useWaitForTransaction({
        confirmations: 1,
        hash: addDislikeData?.hash,
    });
  
    //user context logging
    useEffect(() => {
      console.log("address:", address);
      console.log("network", chains);
      console.log("___________");
    }, [address, chains]);
  
    return {
        addDislike,
        dislikeFee,
        isAddDislikeLoading,
        dislikeTxSuccess,
        dislikeTxError
    };
  }