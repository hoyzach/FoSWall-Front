'use client'
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHand } from '@fortawesome/free-solid-svg-icons';
import { tokenData } from './tokenData';
import useContractAction from '../../utils/contractAction';
import useChainCheck from '../../utils/chainCheck';

export default function Owned() {
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(false);

  const { network, contract, prefix, WalletClient } = useChainCheck();

  useEffect(() => {
    if(WalletClient) {
      async function fetchData(address) {
        const data = await tokenData(address);
        setData(data);
      }

      fetchData(WalletClient.account.address);
      }
  }, [reload, WalletClient]);

  const handleUserAction = () => {
    // Perform your specific action here...

    // Then reload data
    setReload(prevState => !prevState);
  };

  const { executeAction: claimToken, readData: feesAccrued} = useContractAction({ readFunctionName: 'getfeesAccrued', writeFunctionName: 'claimToken' });

  const handleClaim = (tokenId) => {
    console.log(`Claim item ${tokenId}!`);
    claimToken(tokenId); 
  };


  return (
    <>
    <div className="flex flex-wrap justify-center item-center px-4 lg:px-16">
      {data.map((token) => (
        <div key={token.tokenId} className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <img src={token.imageData} alt={`Token ${token.tokenId} Image`} className="w-full h-auto rounded-3xl shadow-xl"/>
          <div className="flex justify-around pt-4 pb-4">
            <button className="border border-gray-300 bg-white text-black px-2 py-1 rounded hover:text-primary hover:bg-black" onClick={() => handleClaim(token.tokenId)}>
              <FontAwesomeIcon icon={faHand} />
            </button>
            <button className="border border-gray-300 bg-white text-black px-2 py-1 rounded hover:bg-black">
              <a href={`https://${prefix}opensea.io/assets/${network}/${contract}/${token.tokenId}`} target='_blank'>
                <img src='/opensea.png' className="w-6 h-6"></img>
              </a>
            </button>
          </div>
        </div>
      ))}
    </div>
    </>
  );
  
  
}