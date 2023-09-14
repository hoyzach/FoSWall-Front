'use client'
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHand, faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { ethers } from 'ethers';
import { tokenData } from './tokenData';
import { useContractReadLoop } from '../../utils/contractReads';
import contractWrite from '../../utils/contractWrite';
import useClientCheck from '../../utils/clientCheck';

export default function Owned() {
  const [data, setData] = useState([]);
  const [zero, setZero] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tokenIdToBeClaimed, setTokenIdToBeClaimed] = useState(null);
  const [feesToBeClaimed, setFeesToBeClaimed] = useState(null);

  const { contract: contract, WalletClient: WalletClient } = useClientCheck();
  const { executeAction: claimToken, actionTxSuccess: claimTXSuccess } = contractWrite({ writeFunctionName: 'claimToken' });
  
  let fees = [];
  if(data){
    fees = useContractReadLoop(contract, "getfeesAccrued", data);
    // console.log('fees: ', fees);
  }
  
  useEffect(() => {
    document.title = 'Owned | Freedom of Speech';
  }, []);

  const fetchData = async (address) => {
    const data = await tokenData(address);
    if(data.length > 0){
      setZero(false);
    } else {setZero(true);}
    setData(data);
  };

  useEffect(() => {
    console.log('Data reload!')
    if(WalletClient) {
      fetchData(WalletClient.account.address);
      } else { 
        setData([]);
      }
  }, [WalletClient]);

  const handleClaim = (tokenId) => {
    console.log(`Claim item ${tokenId}!`);
    claimToken(tokenId);
    handleCloseModal();
  };

  const handleOpenModal = (tokenId, fees) => {
    setTokenIdToBeClaimed(tokenId);
    setFeesToBeClaimed(fees);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleRefresh = () => {
    if(WalletClient) {
      fetchData(WalletClient.account.address);
      } else { 
        setData([]);
      }
      console.log('Refresh!');
  };

  return (
    <>
      {!WalletClient && (
        <div className='border border-4 bg-gray-700 p-4'>Please connect your wallet.</div>
      )}
      {WalletClient && zero && (
        <div className='border border-4 bg-gray-700 p-4'>You don't own any tokens. Please visit the <a href="/mint" className="hover:text-link-hover"><u>mint</u></a> page to start minting!</div>
      )}
      {/* <button className='fixed bottom-10 left-4 border border-gray-300 bg-white text-black hover:bg-black hover:text-primary text-sm px-2.5 py-1 rounded' onClick={handleRefreshFees}>Refresh fees</button> */}
      <div className="flex flex-wrap justify-center items-center px-4 lg:px-16">
        {data.map((token, index) => (
          <div key={token.tokenId} className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 sm:min-w-[500px]">
            <img src={token.imageData} alt={`Token ${token.tokenId} Image`} className="w-full h-auto rounded-3xl shadow-xl"/>
            <div className="flex justify-around pt-4 pb-4">
              <button
                disabled={!fees || fees[index] === undefined}  // Conditional check
                className={`relative border border-gray-300 bg-white text-black px-2 py-1 rounded font-bold ${!fees || fees[index] === undefined ? 'cursor-not-allowed opacity-50' : 'hover:text-primary hover:bg-black'}`}
                onClick={() => handleOpenModal(token.tokenId, fees[index])}
              >
                <FontAwesomeIcon icon={faHand} />{' '}
                <span>
                {
                  (fees && fees[index] !== undefined ?
                    "Claim " + (() => {
                      const numStr = ethers.formatEther(fees[index]);
                      const decimalPart = numStr.split('.')[1] || '';
                      let displayNum;
                      if (decimalPart.length > 8) {
                        displayNum = numStr.split('.')[0] + '.' + decimalPart.slice(0, 8) + '...';
                      } else {
                        displayNum = numStr;
                      }
                      return displayNum;
                    })() + " Matic"
                  : "Token Inactive")
                }
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-black" id="modal-title">
                    Are you sure?
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-black">
                      You're about to claim FoS #{tokenIdToBeClaimed} for <strong>{ethers.formatEther(feesToBeClaimed)} Matic</strong>.<br/><br/>Claiming a token removes the expression and disallows further public interaction with the token.<br/><br/>The value claimed shown above could change by the time your claim is complete.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button onClick={() => handleClaim(tokenIdToBeClaimed)} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-400 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">
                  Yes, claim
                </button>
                <button onClick={handleCloseModal} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-gray-700 hover:bg-red-300 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <button 
        className="fixed bottom-10 left-4 w-10 h-9 border border-gray-300 bg-white text-black px-2 py-1 rounded hover:text-primary hover:bg-black"
        onClick={() => handleRefresh()}
      >
        <FontAwesomeIcon icon={faArrowsRotate} />
      </button>
    </>
  );
  
  
}