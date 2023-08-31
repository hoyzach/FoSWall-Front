'use client'
import { useEffect } from 'react';

export default function Disclaimer() {

  useEffect(() => {
    document.title = 'Disclaimer | Freedom of Speech';
  }, []);

  return (
    <div style={{backgroundColor: 'rgba(31, 41, 55, 0.8)'}} className="border border-4 text-primary text-sm md:text-base xl:text-lg p-4 w-5/6 md:w-2/3 2xl:w-1/2 rounded">
        <h2 className="font-bold text-2xl text-center">Freedom of Speech NFT Disclaimer</h2>
        <br/>
        <h3 className='text-lg italic font-bold text-center'>By creating a Freedom of Speech Non-Fungible Token (NFT) through this platform, you ("the Creator") understand and accept the following:</h3>
        <br/>
        <p className='text-white leading-8'> 
          <ol className="list-decimal pl-8">
            <li className="pl-4">You are the sole author of the expression minted on your NFT, or you have obtained all necessary rights, permissions, licenses, or clearances to lawfully use the expression.</li>
            <li className="pl-4">The expression minted on your NFT does not infringe upon the copyright, trademark, patent, trade secret, or any other intellectual property rights of any third party.</li>
            <li className="pl-4">The expression minted on your NFT does not expose, disseminate, or otherwise utilize sensitive information that does not legally belong to you or is not authorized for use by you.</li>
            <li className="pl-4">
              The Creator shall be solely responsible for any and all claims, damages, liabilities, costs, and expenses (including but not limited to legal fees and expenses) 
              arising out of or related to any breach of the above statements or any use of this smart contract that violates any law, rule, or regulation, or the rights of any third party.
            </li>
          </ol>
        </p>
        <br/>
        <h3 className='text-lg italic font-bold text-center'>By engaging with this smart contract and creating an NFT, you affirm that your actions comply with all applicable laws and regulations, and you acknowledge that the contract owners shall not be liable for any unlawful or unauthorized activities.</h3>
    </div>
  );
}