'use client'
import React from 'react';
import useChainCheck from '../utils/chainCheck';

const Footer = () => {
    
    let { network, contract } = useChainCheck();
    if(network === 'mumbai'){
        network = 'mumbai.'
    } else {network = ""}

    return (
        <footer className="bg-gray-800 sticky w-full bottom-0 text-primary underline">
            <div className='flex flex-row justify-between px-2 font-bold'>
                <a href={`https://${network}polygonscan.com/address/${contract}`} className="hover:text-white te" target="_blank">Contract</a>
                <a href="/disclaimer" className="hover:text-white">Disclaimer</a>
            </div>
        </footer>
    );
};

export default Footer;