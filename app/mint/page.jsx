'use client';
import React, { useState, useEffect } from 'react';
import useContractAction from '../../utils/contractAction';
import contractWrite from '../../utils/contractWrite';
import useClientCheck from '../../utils/clientCheck';

export default function Mint() {
    const [expression, setExpression] = useState('');
    const [isOnMumbai, setIsOnMumbai] = useState(false);
    const [error, setError] = useState('');
    const [isDisclaimerAccepted, setIsDisclaimerAccepted] = useState(false);

    const { network: network, WalletClient: WalletClient } = useClientCheck();

    const { executeAction: mint } = useContractAction({ readFunctionName: 'mintFee', writeFunctionName: 'mint' });
    const { executeAction: acceptDisclaimer } = contractWrite({ writeFunctionName: 'acceptDisclaimer' });

    useEffect(() => {
        document.title = 'Mint | Freedom of Speech';
      }, []);

    useEffect(() => {
        // Check if the connected network is Mumbai
        console.log("Current network:", network);
        setIsOnMumbai(network === 'mumbai');
    }, [network]);

    const handleChange = (event) => {
        event.preventDefault();
        const value = event.target.value;
        if (new Blob([value]).size > 56) {
            setError('Expression must be less than 56 bytes');
        } else {
            setError('');
        }
        setExpression(value);  // Always update expression
    };

    return (
        <>
            {!WalletClient && (
                <div className='border border-4 bg-gray-700 p-4 mb-12'>Please connect your wallet.</div>
            )}
            {!isOnMumbai && WalletClient && ( // Only show this message if the wallet is connected but not on the Mumbai network
                <div className='border border-4 bg-gray-700 p-4 mb-12'>Please connect to the Mumbai network.</div>
            )}
            <form 
                className="w-full max-w-lg px-8 pt-6 pb-8 mb-4"
                onSubmit={(e) => {
                    e.preventDefault();
                    mint(expression);
                }}
            >
                <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="expression">Enter your expression here:</label>
                    <textarea
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline ${error ? 'border-red-500' : ''}`}
                        id="expression"
                        type="text"
                        placeholder="Enter your expression"
                        value={expression}
                        onChange={handleChange}
                    />
                    {error && (
                        <p className="ml-3 text-error text-xs italic font-bold">{error}</p>
                    )}
                </div>
                <div className='flex items-center text-white'>
                    <div className="flex">
                        <button 
                            disabled={!isDisclaimerAccepted || !WalletClient || !isOnMumbai}
                            className={`bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${!isDisclaimerAccepted ? 'opacity-50 cursor-not-allowed' : ''}`}
                            type="submit"
                        >
                            Mint
                        </button>
                    </div>
                    <div className="flex ml-4">
                        <input 
                            type="checkbox" 
                            id="disclaimer" 
                            disabled={!WalletClient || !isOnMumbai}
                            className={(!WalletClient || !isOnMumbai) ? 'opacity-50 cursor-not-allowed' : ''}
                            checked={isDisclaimerAccepted}
                            onChange={() => {
                                setIsDisclaimerAccepted(!isDisclaimerAccepted);
                                if (!isDisclaimerAccepted) {
                                    acceptDisclaimer();
                                }
                            }}
                        />
                        <label className="ml-2">
                            Accept <a href="/disclaimer" target='_blank' className="hover:text-link-hover"><u>Disclaimer</u></a>
                        </label>
                    </div>
                </div>
            </form>

            {/* Preview Card */}
            <div className="text-white text-center bg-black m-2 rounded-3xl p-2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] overflow-hidden">
                <div className="relative flex flex-col text-[10px] h-full items-center">
                    <div className="absolute top-[22%] text-[12px] sm:text-lg font-bold">FoS #Preview</div>
                    <div className="absolute top-[47%] sm:text-[16.5px] text-primary whitespace-nowrap overflow-hidden">{expression}</div>
                    <div className="absolute top-[70%] sm:text-[16.5px]">Likes: 0</div>
                    <div className="absolute top-[80%] sm:text-[16.5px]">Dislikes: 0</div>
                </div>
            </div>
            
        </>
    );
}
