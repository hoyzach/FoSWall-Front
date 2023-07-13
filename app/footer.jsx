'use client'
import React from 'react';
import { useWalletClient } from "wagmi";

const NEXT_PUBLIC_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
const NEXT_PUBLIC_TEST_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_TEST_CONTRACT_ADDRESS;

const Footer = () => {
    
    const { data: WalletClient } = useWalletClient();
    console.log(WalletClient)

    let network = "";
    let address = NEXT_PUBLIC_CONTRACT_ADDRESS;
    if(WalletClient){
        if (WalletClient.chain.id === 80001) {
            network = 'mumbai.';
            address = NEXT_PUBLIC_TEST_CONTRACT_ADDRESS;
        }
    }

    return (
        <footer className="bg-gray-800 fixed w-full bottom-0 text-primary underline">
            <div className='flex flex-row justify-between px-2 font-bold'>
                <a href={`https://${network}polygonscan.com/address/${address}`} className="hover:text-white te">Contract</a>
                <a href="/disclaimer" className="hover:text-white">Disclaimer</a>
            </div>
        </footer>
    );
};

export default Footer;