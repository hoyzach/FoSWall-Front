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
  
  export default function useMint() {
    const [mintFee, setMintFee] = useState(0);
  
    const { address } = useAccount();
    const { chains } = useNetwork();

    const { network, contract, prefix, WalletClient } = useChainCheck();
  
    //mintFee function call structure
    const { data: mintFeeData } = useContractRead({
      address: contract,
      abi: contractABI,
      functionName: "creationFee",
      watch: true,
    });
  
    useEffect(() => {
      if (mintFeeData) {
        setMintFee(mintFeeData);
        console.log("calling mintFee")
      }
    }, [mintFeeData]);
  
    //mint function call structure
    const {
      data: mintData,
      write: mintToken,
      isLoading: isMintLoading,
      isSuccess: isMintStarted,
      error: mintError,
    } = useContractWrite({
      address: contract,
      abi: contractABI,
      functionName: "mint",
    });
  
  
    //mint function call
    const mint = async (expression) => {
      mintToken({
        args: [expression],
        value: mintFee,
        signer: WalletClient
      });
    }
  
    //mint logging
    useEffect(() => {
      console.log("mintData:", mintData);
      console.log("isMintLoading:", isMintLoading);
      console.log("isMintStarted", isMintStarted);
      console.log("mintError:", mintError);
      console.log("___________");
    }, [mintData, isMintLoading, isMintStarted]);
  
    //check TX for mint function
    const { isSuccess: mintTxSuccess, error: mintTxError } = useWaitForTransaction({
      confirmations: 1,
      hash: mintData?.hash,
    });
  
    //user context logging
    useEffect(() => {
      console.log("address:", address);
      console.log("network", chains);
      console.log("___________");
    }, [address, chains]);
  
    return {
      mint,
      mintFee,
      isMintLoading,
      mintTxSuccess,
      mintTxError
    };
  }