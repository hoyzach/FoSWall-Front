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

export default function useAddLike() {
  const [likeFee, setLikeFee] = useState(0);

  const { address } = useAccount();
  const { chains } = useNetwork();
  const { data: WalletClient } = useWalletClient();

  //likeFee function call structure
  const { data: likeFeeData } = useContractRead({
    address: NEXT_PUBLIC_CONTRACT_ADDRESS,
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
    address: NEXT_PUBLIC_CONTRACT_ADDRESS,
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
  const { isSuccess: txSuccess, error: txError } = useWaitForTransaction({
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
    txSuccess,
    txError
  };
}
