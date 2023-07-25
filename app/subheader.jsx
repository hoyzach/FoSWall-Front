'use client'
import React from 'react';
import { ethers } from 'ethers';
import useContractAction from '../utils/contractAction';

const Subheader = () => {

    const { readData: likeFee } = useContractAction({ readFunctionName: 'likeFee' });
    const { readData: dislikeFee } = useContractAction({ readFunctionName: 'dislikeFee' });
    const { readData: mintFee } = useContractAction({ readFunctionName: 'creationFee' });
    const { readData: dislikeThreshold } = useContractAction({ readFunctionName: 'dislikeThreshold' });

    return (
        <header className='bg-gray-800 sticky w-full top-16 text-primary '>
            <hr className="border-0 h-1 bg-white" />
            <div className='items-center grid grid-cols-2 p-2'>
                <div className='flex flex-col justify-center items-center text-sm'>
                    <p>Like Fee: <strong>{ethers.formatEther(likeFee)}</strong> Matic</p>
                    <p>Dislike Fee: <strong>{ethers.formatEther(dislikeFee)}</strong> Matic</p>
                </div>
                <div className="flex flex-col justify-center items-center text-sm">
                    <p>Creation Fee: <strong>{ethers.formatEther(mintFee)}</strong> Matic</p>
                    <p>Dislike Threshold: <strong>{parseInt(dislikeThreshold)}</strong></p>
                </div>
            </div>
        </header>
    );
};

export default Subheader;
