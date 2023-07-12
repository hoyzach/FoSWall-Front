'use client';
import React, { useState } from 'react';

export function Expression(props) {
    const [expression, setExpression] = useState('');
    const [error, setError] = useState('');

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
                        props.handleMint(expression);
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
        </>
    );
}
