'use client'
import React from 'react';
import { ethers } from 'ethers';
import useAddLike from '../utils/addLike';
import useAddDislike from '../utils/addDislike';
import useMint from '../utils/mint';

const Subheader = () => {

    const { addLike, likeFee, isLikeLoading, likeTxSuccess, likeTxError } = useAddLike();
    const { addDislike, dislikeFee, isDislikeLoading, dislikeTxSuccess, dislikeTxError } = useAddDislike();
    const { mint, mintFee, isMintLoading, mintTxSuccess, mintTxError } = useMint();

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
                    <p>Dislike Threshold: <strong>{dislikeFee}</strong></p>
                </div>
            </div>
        </header>
    );
};

export default Subheader;
