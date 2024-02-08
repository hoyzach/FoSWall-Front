'use client'
import React from 'react';
import useClientCheck from '../utils/clientCheck';

const Footer = () => {
    
    let { network: network, contract: contract } = useClientCheck();
    //if(network === 'mumbai'){
        network = 'mumbai.'
    //} else {network = ""}

    return (
        <footer className="bg-gray-800 sticky w-full bottom-0 text-primary underline">
            <div className='flex flex-row justify-between px-2 font-bold'>
                <a href={`https://${network}polygonscan.com/address/${contract}`} className="hover:text-white" target="_blank">Contract</a>
                <a href="/disclaimer" className="hover:text-white" target='_blank'>Disclaimer</a>
            </div>
        </footer>
    );
};

export default Footer;