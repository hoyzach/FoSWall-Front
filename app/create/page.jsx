'use client';
import React, { useState } from 'react';
import useContractAction from '../../utils/contractAction';

export const metadata = {
    title: 'Create'
}

export default function Create() {
    const [expression, setExpression] = useState('');
    const [error, setError] = useState('');

    const { executeAction: mint } = useContractAction({ readFunctionName: 'creationFee', writeFunctionName: 'mint' });

    const handleChange = (event) => {
        event.preventDefault();
        const value = event.target.value;
        if (new Blob([value]).size > 48) {
            setError('Expression must be less than 48 bytes');
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
            <div className="text-white text-center bg-black m-2 rounded-3xl p-2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] overflow-hidden">
                <div className="relative flex flex-col text-xs h-full items-center">
                    <div className="absolute top-[22%] sm:text-base font-bold">FoS #16</div>
                    <div className="absolute top-[47%] sm:text-sm text-primary whitespace-nowrap overflow-hidden">{expression}</div>
                    <div className="absolute top-[70%] sm:text-base">Likes: 0</div>
                    <div className="absolute top-[80%] sm:text-base">Dislikes: 0</div>
                </div>
            </div>
            
        </>
    );
}
