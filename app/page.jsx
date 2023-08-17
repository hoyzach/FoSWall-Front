import React from 'react';

export default function Home() {
    
    return (
        <div className="bg-gray-800 border border-4 text-primary text-sm p-4 w-5/6 lg:w-1/2 rounded ">
            <h2 className="font-bold text-xl text-center">Welcome to FoSWall!</h2>
            <br/>
            <h3 className='text-lg italic text-center'>What is FoS?</h3>
            <br/>
            <p className='text-center leading-6'> 
                Freedom of Speech is a smart contract deployed on the Polygon Mumbai test chain. 
                It allows users to mint Non-Fungible Tokens (FoS Tokens) which display their chosen 'expression'. 
                FoS Tokens can earn fees ('fees accrued') through users liking the token or disliking other FoS Tokens.
            </p>
            <br/>
            <h3 className='text-lg italic text-center'>What is on an FoS Token</h3>
            <br/>
            <p className='text-center leading-6'>
                At the top of the FoS Token is the FoS#, ordered sequentially per mint.
                The 'expression' is displayed in the middle, followed by the total number of both likes and dislikes displayed below.
            </p>
            <br/>
            <h3 className='text-lg italic text-center'>Minting an FoS Token</h3>
            <br/>
            <p className='text-center leading-6'>
                Users are able to mint as many FoS Tokens as desired paying a 'mint fee' for each one. 
                When selecting an 'expression' to display on your FoS Token, please follow all the rules outlined in the Freedom of Speech disclaimer.
                The maximum length of an expression is 48 bytes, or 48 characters.
            </p>
            <br/>
            <h3 className='text-lg italic text-center'>Interacting with FoS Tokens</h3>
            <br/>
            <p className='text-center leading-6'>
                Users can like or dislike 'active' tokens for a small fee. Only one of these actions may be performed once per FoS Token per wallet address.
            </p>
            <br/>
            <h3 className='text-lg italic text-center'>Earning Fees</h3>
            <br/>
            <p className='text-center leading-6'> 
                Active FoS Tokens can earn fees ('fees accrued') through users liking the token or disliking other FoS Tokens. 
                When an FoS token is liked, the like fee is added to its 'fees accrued' balance. 
                When any other FoS Token is disliked, the dislike fee is divided evenly between all other 'active' FoS Tokens and added to their respective 'fees accrued' balance.
            </p>
            <br/>
            <h3 className='text-lg italic text-center'>Claiming Fees</h3>
            <br/>
            <p className='text-center leading-6'> 
                The 'fees accrued' for an FoS Token can be 'claimed' in lump sum, one time only. 
                After that, the 'expression' on the FoS Token will be replaced with "CLAIMED" and will no longer be able to be liked or disliked ('inactive'), and therefore no longer able to earn fees.
            </p>
            <br/>
            <h3 className='text-lg italic text-center'>Losing Fees</h3>
            <br/>
            <p className='text-center leading-6'> 
                The 'fees accrued' for an FoS Token can be lost if its number of dislikes exceeds twice its number of likes, as long as the number of dislikes is over the current 'dislike threshold'. 
                If this occurs, the token becomes 'nullified'. A 'nullified' token becomes 'inactive', has its 'expression' replaced with "NULLIFIED," and has its total 'fees accrued' divided evenly between the current 'active' FoS Tokens.
            </p>
            
            {/* 
            The total number of both likes and dislikes are displayed on the FoS Token, below the 'expression', and will remain after a token is no longer 'active'. 
            'Inactive' FoS Tokens are not burned and can still be transferred to different wallet addresses. 
            */}


        </div>
    );
}

