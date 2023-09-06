export async function tokenData(signer) {
  console.log("signer: ", signer)
  const response = await fetch('https://api.studio.thegraph.com/query/47271/foswalltest/version/latest', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      operationName: null,
      query: `
        {
          tokens(
            where: {owner_contains_nocase: "${signer}"},
            orderBy: tokenId
          ) {
            id
            tokenURI
          }
        }
      `,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  const tokens = data.data.tokens;
  const cardData = tokens.map(token => {
    let tokenData = JSON.parse(atob(token.tokenURI.split(",")[1]));
    return {
      tokenId: token.id, 
      imageData: tokenData.image_data
    };
  });
  console.log("data: ", cardData)

  return cardData;
}
