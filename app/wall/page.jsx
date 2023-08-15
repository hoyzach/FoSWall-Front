'use client'
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { tokenData } from './tokenData';
import useContractAction from '../../utils/contractAction';
import useClientCheck from '../../utils/clientCheck';
import { readContract } from '@wagmi/core'
import contractABI from "../../contracts/FreedomOfSpeech.json";
import { ethers } from 'ethers';

export default function Wall() {
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(false);
  const [tokenNumber, setTokenNumber] = useState('');
  const [feesAccrued, setFeesAccrued] = useState(undefined);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { network: network, contract: contract, prefix: prefix, WalletClient: WalletClient } = useClientCheck();

  const { executeAction: addLike, actionTxSuccess: likeTxSuccess } = useContractAction({ readFunctionName: 'likeFee', writeFunctionName: 'addLike' });
  const { executeAction: addDislike, actionTxSuccess: dislikeTxSuccess } = useContractAction({ readFunctionName: 'dislikeFee', writeFunctionName: 'addDislike' });


  useEffect(() => {
    async function fetchData() {
      const data = await tokenData();
      setData(data);
    }

    fetchData();
  }, [reload]);

  useEffect(() => {
    let timer;
    if(likeTxSuccess || dislikeTxSuccess) {
      console.log("reload")
      timer = setTimeout(() => {
        Reload();
      }, 15000); // wait for 15,000 milliseconds = 15 seconds
    }
    // clear the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [likeTxSuccess, dislikeTxSuccess]);

  const Reload = () => {
    setReload(prevState => !prevState);
  };

  const handleLike = (tokenId) => {
    console.log(`Liked item ${tokenId}!`);
    addLike(tokenId); 
  };

  const handleDislike = (tokenId) => {
    console.log(`Disliked item ${tokenId}!`);
    addDislike(tokenId)
  };

  const handletokenNumberChange = (e) => {
    e.preventDefault();
    setTokenNumber(e.target.value)
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setSubmitClicked(true);
    setErrorMessage('');
  
    try {
      const readData = await readContract({
        address: contract,
        abi: contractABI,
        functionName: "getfeesAccrued",
        args: [tokenNumber],
      });
      setFeesAccrued(readData);
    } catch (error) {
      setErrorMessage(error.cause.reason)
      setFeesAccrued(null);
    }
  };

  return (
    <>
      {!WalletClient && (
        <div className='border border-4 bg-gray-700 p-4'>Please connect your wallet.</div>
      )}
      <div className="flex flex-wrap justify-center items-center px-4 lg:px-16">
        {data.map((token) => (
          <div key={token.tokenId} className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 sm:min-w-[500px]">
            <img src={token.imageData} alt={`Token ${token.tokenId} Image`} className="w-full h-auto rounded-3xl shadow-xl"/>
            <div className="flex justify-around pt-4 pb-4">
              <button 
                disabled={!WalletClient}
                className="relative border border-gray-300 bg-white text-black px-2 py-1 rounded hover:text-primary hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed" 
                onClick={() => handleLike(token.tokenId)}
              >
                <FontAwesomeIcon icon={faThumbsUp} />
                <div className="tooltip absolute text-center text-xs bg-gray-700 text-white px-2 py-1 -bottom-6 left-1/2 transform -translate-x-1/2 rounded opacity-0 transition-opacity">
                  Connect wallet
                </div>
              </button>
              <button className="border border-gray-300 bg-white text-black px-2 py-1 rounded hover:bg-black">
                <a href={`https://${prefix}opensea.io/assets/${network}/${contract}/${token.tokenId}`} target='_blank'>
                  <img src='/opensea.png' className="w-6 h-6"></img>
                </a>
              </button>
              <button 
                disabled={!WalletClient}
                className="relative border border-gray-300 bg-white text-black px-2 pt-1 rounded hover:text-primary hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed" 
                onClick={() => handleDislike(token.tokenId)}
              >
                <FontAwesomeIcon icon={faThumbsDown} />
                <div className="tooltip absolute text-center text-xs bg-gray-700 text-white px-2 py-1 -bottom-6 left-1/2 transform -translate-x-1/2 rounded opacity-0 transition-opacity">
                  Connect wallet
                </div>
              </button>
            </div>
          </div>
        ))}
      </div>
      <form className="fixed bottom-10 left-4" onSubmit={handleSubmit}>
        <input value={tokenNumber} onChange={handletokenNumberChange} className="max-w-[70px] mr-2 text-black text-center text-sm px-4 py-1" placeholder="FoS #"/>
        <button
          disabled={!WalletClient}
          className='border border-gray-300 bg-white text-black hover:bg-black hover:text-primary text-sm px-2.5 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed'
        >
          Get fees
        </button>
        {
          submitClicked && (
            <span className='px-2 text-white text-sm border border-2 bg-gray-700 p-1 mx-1'>
              {
                feesAccrued !== undefined ?
                  (feesAccrued !== null ? // Check if an error occurred
                    (() => {
                      const numStr = ethers.formatEther(feesAccrued);
                      const decimalPart = numStr.split('.')[1] || '';
                      let displayNum;
                      if (decimalPart.length > 8) {
                        displayNum = numStr.split('.')[0] + '.' + decimalPart.slice(0, 8) + '...';
                      } else {
                        displayNum = numStr;
                      }
                      return displayNum;
                    })() + " Matic"
                  : errorMessage) // Display "Error" if feesAccrued is null
                : "Loading..." // Display "Loading..." if feesAccrued is undefined
              }
            </span>
          )
        }
      </form>
    </>
  );
  
  
}