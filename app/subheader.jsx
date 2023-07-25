'use client'
import { ethers } from 'ethers';
import useContractReadSingle from '../utils/contractRead';

const Subheader = () => {

    const likeFee = useContractReadSingle({ readFunctionName: 'likeFee' });
    const dislikeFee = useContractReadSingle({ readFunctionName: 'dislikeFee' });
    const mintFee = useContractReadSingle({ readFunctionName: 'creationFee' });
    const dislikeThreshold = useContractReadSingle({ readFunctionName: 'dislikeThreshold' });

    return (
        <header className='bg-gray-800 sticky w-full top-16 text-primary '>
            <hr className="border-0 h-1 bg-white" />
            <div className='items-center grid grid-cols-2 p-2'>
                <div className='flex flex-col justify-center items-center text-sm'>
                    <p>Like Fee: <strong>{likeFee ? ethers.formatEther(likeFee) : 'Loading...'}</strong> {likeFee && 'Matic'}</p>
                    <p>Dislike Fee: <strong>{dislikeFee ? ethers.formatEther(dislikeFee) : 'Loading...'}</strong> {dislikeFee && 'Matic'}</p>
                </div>
                <div className="flex flex-col justify-center items-center text-sm">
                    <p>Creation Fee: <strong>{mintFee ? ethers.formatEther(mintFee) : 'Loading...'}</strong> {mintFee && 'Matic'}</p>
                    <p>Dislike Threshold: <strong>{dislikeThreshold ? parseInt(dislikeThreshold) : 'Loading...'}</strong></p>
                </div>
            </div>
        </header>
    );
};

export default Subheader;
