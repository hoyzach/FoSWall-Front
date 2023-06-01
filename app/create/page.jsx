'use client';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'

export const metadata = {
    title: 'Create'
}

export default function Create(props) {
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

            {/* Preview Card */}
            <div className="w-1/2 sm:w-1/4 lg:w-1/6 text-black text-center bg-gray-900 px-5 py-5 m-2 rounded">
                <div className="flex flex-col justify-around h-full items-center">
                    <div className="tracking-wide text-sm text-white font-bold">Preview</div>
                    <div className="tracking-wide text-sm text-primary">{expression}</div>
                    <div className="tracking-wide text-sm text-white">Likes: 0</div>
                    <div className="tracking-wide text-sm text-white">Dislikes: 0</div>
                    <div className="flex justify-around w-full mt-3">
                        <button className="text-white focus:outline-none mt-0">
                            <FontAwesomeIcon icon={faThumbsUp} />
                        </button>
                        <button className="text-white focus:outline-none mt-1">
                            <FontAwesomeIcon icon={faThumbsDown} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
