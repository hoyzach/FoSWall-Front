'use client'
import { useEffect, useState } from 'react';
import { tokenData } from './tokenData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import useAddLike from '../../utils/functions';

export default function Wall() {
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(false);

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

  const { addLike, likeFee, isLikeLoading, txSuccess, txError } = useAddLike();

  const handleLike = (tokenId) => {
    console.log(`Liked item ${tokenId}!`);
    addLike(tokenId); 
  };

  const handleDislike = (tokenId) => {
    console.log(`Disliked item ${tokenId}!`);
    // Perform your specific action here...
  };

  return (
    <div className="flex flex-wrap justify-center item-center px-4 lg:px-16">
      {data.map((token) => (
        <div key={token.tokenId} className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <img src={token.imageData} alt={`Token ${token.tokenId} Image`} className="w-full h-auto rounded-corners"/>
          <div className="flex justify-around pt-4 pb-4">
            <button className="border border-gray-300 bg-white text-black px-2 py-1 rounded" onClick={() => handleLike(token.tokenId)}>
              <FontAwesomeIcon icon={faThumbsUp} />
            </button>
            <button className="border border-gray-300 bg-white text-black px-2 pt-1 rounded" onClick={() => handleDislike(token.tokenId)}>
              <FontAwesomeIcon icon={faThumbsDown} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
  
  
}