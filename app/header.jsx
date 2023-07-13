'use client'
import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

const Header = () => {

    return (
        <header className='bg-black fixed w-full top-0 text-primary '>
            <div className='items-center grid md:grid-cols-3 grid-cols-1 p-2'>
                <div className='flex justify-center md:justify-start py-1'> 
                    <span className="font-bold text-xl">FoSWall</span>
                </div>
                <div className="flex justify-center text-sm text-primary underline">
                    <a href="/" className="mx-2 sm:mt-0 hover:text-white">Home</a>
                    <a href="wall" className="mx-2 sm:mt-0 hover:text-white">Wall</a>
                    <a href="create" className="mx-2 sm:mt-0 hover:text-white">Create</a>
                </div>
                <div className="flex justify-center md:justify-end py-1">
                    <ConnectButton />
                </div>
            </div>
            <hr className="border-0 h-1 bg-white" />
        </header>
    );
};

export default Header;