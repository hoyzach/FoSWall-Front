'use client'
import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

const Header = () => {
    return (
        <header className='bg-black sticky w-full top-0 text-primary z-40'>
            <div className='items-center grid md:grid-cols-3 grid-cols-1 p-2'>
                <div className='flex justify-center md:justify-start py-1'> 
                    <span className="font-bold text-xl">F</span>
                    <img src='/fos.jpg' alt="icon" className="h-3 w-3 inline-block rounded-full transform translate-y-2.5" />
                    <span className="font-bold text-xl">SWall</span>
                </div>
                <div className="flex justify-center text-sm text-primary underline">
                    <a href="/" className="mx-2 sm:mt-0 hover:text-white">Home</a>
                    <a href="wall" className="mx-2 sm:mt-0 hover:text-white">Wall</a>
                    <a href="create" className="mx-2 sm:mt-0 hover:text-white">Create</a>
                    <a href="owned" className="mx-2 sm:mt-0 hover:text-white">Owned</a>
                </div>
                <div className="flex justify-center md:justify-end py-1">
                    <ConnectButton />
                </div>
            </div>
        </header>
    );
};

export default Header;
