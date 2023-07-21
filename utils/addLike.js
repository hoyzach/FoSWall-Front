import {
  useAccount,
  useContractRead,
  useContractWrite,
  useNetwork,
  useWaitForTransaction,
} from "wagmi";
import { useState, useEffect } from "react";
import contractABI from "../contracts/FreedomOfSpeech.json";
import useChainCheck from "./chainCheck";

export default function useAddLike() {
  const [likeFee, setLikeFee] = useState(0);

  const { address } = useAccount();
  const { chains } = useNetwork();
  
  const { network, contract, prefix, WalletClient } = useChainCheck();

  //likeFee function call structure
  const { data: likeFeeData } = useContractRead({
    address: contract,
    abi: contractABI,
    functionName: "likeFee",
    watch: true,
  });

  useEffect(() => {
    if (likeFeeData) {
      setLikeFee(likeFeeData);
      console.log("calling likeFee")
    }
  }, [likeFeeData]);

  //addLike function call structure
  const {
    data: addLikeData,
    write: likeToken,
    isLoading: isAddLikeLoading,
    isSuccess: isAddLikeStarted,
    error: addLikeError,
  } = useContractWrite({
    address: contract,
    abi: contractABI,
    functionName: "addLike",
  });


  //addLike function call
  const addLike = async (tokenId) => {
    likeToken({
      args: [tokenId],
      value: likeFee,
      signer: WalletClient
    });
  }

  //addLike logging
  useEffect(() => {
    console.log("addLikeData:", addLikeData);
    console.log("isAddLikeLoading:", isAddLikeLoading);
    console.log("isAddLikeStarted", isAddLikeStarted);
    console.log("addLikeError:", addLikeError);
    console.log("___________");
  }, [addLikeData, isAddLikeLoading, isAddLikeStarted]);

  //check TX for like function
  const { isSuccess: likeTxSuccess, error: likeTxError } = useWaitForTransaction({
    confirmations: 1,
    hash: addLikeData?.hash,
  });

  //user context logging
  useEffect(() => {
    console.log("address:", address);
    console.log("network", chains);
    console.log("___________");
  }, [address, chains]);

  return {
    addLike,
    likeFee,
    isAddLikeLoading,
    likeTxSuccess,
    likeTxError
  };
}