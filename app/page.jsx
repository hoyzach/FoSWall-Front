import React from 'react';

export default function Home() {
    
    return (
        <div style={{backgroundColor: 'rgba(31, 41, 55, 0.7)'}} className="border border-4 text-primary text-sm md:text-base xl:text-lg p-4 w-5/6 md:w-2/3 2xl:w-1/2 rounded">
            <h2 className="font-bold text-2xl text-center">Welcome to FoSWall!</h2>
            <br/><br/>
            <h3 className='text-lg italic font-bold text-center'>What is FoS?</h3>
            <br/>
            <p className='text-center leading-7 text-white'> 
                Freedom of Speech is a smart contract deployed on the Polygon Mumbai test chain. 
                It allows users to mint Non-Fungible Tokens called FoS Tokens, which display a custom expression. 
                FoS Tokens can earn fees, tracked by its <b><i>fees accrued</i></b> balance, through users liking the token or disliking other FoS Tokens.
            </p>
            <br/><br/>
            <h3 className='text-lg italic font-bold text-center'>What is on an FoS Token?</h3>
            <br/>
            <p className='text-center leading-7 text-white'>
                At the top of the FoS Token is the FoS#, ordered sequentially per mint.
                The expression is displayed in the middle, followed by the token's total number of both likes and dislikes displayed below it.
            </p>
            <br/><br/>
            <h3 className='text-lg italic font-bold text-center'>Minting an FoS Token</h3>
            <br/>
            <p className='text-center leading-7 text-white'>
                Users are able to mint as many FoS Tokens as desired paying a mint fee for each one. 
                When selecting an expression to display on your FoS Token, please follow all the rules outlined in the Freedom of Speech <a className="hover:text-primary underline" href='/disclaimer' target='_blank'>disclaimer</a>.
                The maximum length of an expression is 48 bytes, or 48 characters.
            </p>
            <br/><br/>
            <h3 className='text-lg italic font-bold text-center'>Interacting with FoS Tokens</h3>
            <br/>
            <p className='text-center leading-7 text-white'>
                Users can like or dislike <b><i>active</i></b> tokens for a small fee. Only one of these actions may be performed once per FoS Token per wallet address.
            </p>
            <br/><br/>
            <h3 className='text-lg italic font-bold text-center'>Earning Fees</h3>
            <br/>
            <p className='text-center leading-7 text-white'> 
                When an <b><i>active</i></b> FoS token is liked, the like fee is added to its <b><i>fees accrued</i></b> balance. 
                When any other FoS Token is disliked, the dislike fee is divided evenly between all other 'active' FoS Tokens and added to their respective <b><i>fees accrued</i></b> balance.
            </p>
            <br/><br/>
            <h3 className='text-lg italic font-bold text-center'>Claiming Fees</h3>
            <br/>
            <p className='text-center leading-7 text-white'> 
                The <b><i>fees accrued</i></b> for an FoS Token can be <b><i>claimed</i></b> in lump sum, <u>one time only</u>. 
                After that, the expression on the FoS Token will be replaced with <b>'CLAIMED'</b>, making it <b><i>inactive</i></b> and ineligible for further likes or dislikes. 
                As a result, it will no longer be able to earn fees.
            </p>
            <br/><br/>
            <h3 className='text-lg italic font-bold text-center'>Losing Fees</h3>
            <br/>
            <p className='text-center leading-7 text-white'> 
                The <b><i>fees accrued</i></b> for an FoS Token can be lost if its number of dislikes exceeds twice its number of likes, as long as the number of dislikes is over the current <b><i>dislike threshold</i></b>. 
                If this occurs, the token is <b><i>nullified</i></b>, becoming <b><i>inactive</i></b>. Its expression is then replaced with <b>'NULLIFIED'</b>, and its total <b><i>fees accrued</i></b> balance is divided evenly among the remaining <b><i>active</i></b> FoS Tokens.
                As a result, it will no longer be able to earn fees.
            </p>
            <br/><br/>
            <h3 className='text-lg italic font-bold text-center'>Inactive Token</h3>
            <br/>
            <p className='text-center leading-7 text-white'> 
                When an FoS Token is <b><i>claimed</i></b> or <b><i>nullified</i></b>, it becomes <b><i>inactive</i></b>, and its expression is altered permanently, while all other aspects of the token remain unchanged.&nbsp;&nbsp;
                <b><i>Inactive</i></b> tokens lose the ability to be further liked, disliked, <b><i>claimed</i></b>, or <b><i>nullified</i></b>.&nbsp;&nbsp;
                <b><i>Inactive</i></b> FoS Tokens are not burned and can still be transferred to different wallet addresses.
            </p>
        </div>
    );
}

