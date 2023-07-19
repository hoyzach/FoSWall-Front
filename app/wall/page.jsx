'use client'
import { useEffect, useState } from 'react';
import { tokenData } from './tokenData';
import { useWalletClient } from "wagmi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import useAddLike from '../../utils/addLike';
import useAddDislike from '../../utils/addDislike';
import Subheader from '../subheader'

const NEXT_PUBLIC_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
const NEXT_PUBLIC_TEST_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_TEST_CONTRACT_ADDRESS;

export default function Wall() {
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(false);

  const { data: WalletClient } = useWalletClient();
    
  let network = "matic";
  let prefix = "";
  let contract = NEXT_PUBLIC_CONTRACT_ADDRESS;
  if(WalletClient){
      if (WalletClient.chain.id === 80001) {
          network = 'mumbai';
          prefix = "testnets.";
          contract = NEXT_PUBLIC_TEST_CONTRACT_ADDRESS;
      }
  }

  useEffect(() => {
    async function fetchData() {
      const data = await tokenData();
      setData(data);
    }

    fetchData();
  }, [reload]);

  const handleUserAction = () => {
    // Perform your specific action here...

    // Then reload data
    setReload(prevState => !prevState);
  };

  const { addLike, likeFee, isLikeLoading, likeTxSuccess, likeTxError } = useAddLike();
  const { addDislike, dislikeFee, isDislikeLoading, dislikeTxSuccess, dislikeTxError } = useAddDislike();

  const handleLike = (tokenId) => {
    console.log(`Liked item ${tokenId}!`);
    addLike(tokenId); 
  };

  const handleDislike = (tokenId) => {
    console.log(`Disliked item ${tokenId}!`);
    addDislike(tokenId)
  };

  return (
    <>
    <div className="flex flex-wrap justify-center item-center px-4 lg:px-16">
      {data.map((token) => (
        <div key={token.tokenId} className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <img src={token.imageData} alt={`Token ${token.tokenId} Image`} className="w-full h-auto rounded-corners shadow-xl"/>
          <div className="flex justify-around pt-4 pb-4">
            <button className="border border-gray-300 bg-white text-black px-2 py-1 rounded hover:text-primary hover:bg-black" onClick={() => handleLike(token.tokenId)}>
              <FontAwesomeIcon icon={faThumbsUp} />
            </button>
            <button className="border border-gray-300 bg-white text-black px-2 py-1 rounded hover:bg-black">
              <a href={`https://${prefix}opensea.io/assets/${network}/${contract}/${token.tokenId}`} target='_blank'>
                <img src='/opensea.png' className="w-6 h-6"></img>
              </a>
            </button>
            <button className="border border-gray-300 bg-white text-black px-2 pt-1 rounded hover:text-primary hover:bg-black" onClick={() => handleDislike(token.tokenId)}>
              <FontAwesomeIcon icon={faThumbsDown} />
            </button>
          </div>
        </div>
      ))}
    </div>
    </>
  );
  
  
}