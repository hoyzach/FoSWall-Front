'use client';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import useMint from '../../utils/mint';

export const metadata = {
    title: 'Create'
}

export default function Create() {
    const [expression, setExpression] = useState(' ');
    const [error, setError] = useState('');

    const { mint, mintFee, isMintLoading, mintTxSuccess, mintTxError } = useMint();

    const handleChange = (event) => {
        event.preventDefault();
        const value = event.target.value;
        if (new Blob([value]).size > 64) {
            setError('Expression must be less than 64 bytes');
        } else {
            setError('');
            setExpression(value);
        }
    };

    return (
        <>
            <form 
                className="w-full max-w-lg px-8 pt-6 pb-8 mb-4"
                onSubmit={(e) => {
                    e.preventDefault();
                    if (!error) {
                        mint(expression);
                    }
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
                        <p className="text-red-500 text-xs italic">{error}</p>
                    )}
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Create</button>
                </div>
            </form>

            {/* Preview Card */}
            <div className="text-black text-center bg-black m-2 rounded-3xl max-w-full">
                <div className="flex flex-col justify-around h-full items-center p-16">
                    <div className="tracking-wide text-sm text-white font-bold py-4">FoS #Preview</div>
                    <div className="tracking-wide text-[8px] text-primary py-12">{expression}</div>
                    <div className="tracking-wide text-sm text-white">Likes: 0</div>
                    <br/>
                    <div className="tracking-wide text-sm text-white mb-4">Dislikes: 0</div>
                </div>
            </div>
            
        </>
    );
}
