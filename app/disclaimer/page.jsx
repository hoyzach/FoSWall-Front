'use client'

export default function Disclaimer() {
  return (
    <div className="bg-gray-700 border border-4 p-4 m-10 rounded">
        <h2 className="font-bold text-lg underline">Freedom of Speech NFT Disclaimer</h2>
        <br/>
        <h3>By creating a Freedom of Speech Non-Fungible Token (NFT) through this platform, you ("the Creator") understand and accept the following:</h3>
        <br/>
        <ol className="list-decimal pl-8">
          <li className="pl-4">You are the sole author of the expression minted on your NFT, or you have obtained all necessary rights, permissions, licenses, or clearances to lawfully use the expression.</li>
          <li className="pl-4">The expression minted on your NFT does not infringe upon the copyright, trademark, patent, trade secret, or any other intellectual property rights of any third party.</li>
          <li className="pl-4">The expression minted on your NFT does not expose, disseminate, or otherwise utilize sensitive information that does not legally belong to you or is not authorized for use by you.</li>
          <li className="pl-4">
            The Creator shall be solely responsible for any and all claims, damages, liabilities, costs, and expenses (including but not limited to legal fees and expenses) 
            arising out of or related to any breach of the above statements or any use of this smart contract that violates any law, rule, or regulation, or the rights of any third party.
          </li>
        </ol>
        <br/>
        <p>By engaging with this smart contract and creating an NFT, you affirm that your actions comply with all applicable laws and regulations, and you acknowledge that the contract owners shall not be liable for any unlawful or unauthorized activities.</p>
    </div>
  );
}