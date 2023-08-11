export async function tokenData() {
  const response = await fetch('https://api.studio.thegraph.com/query/47271/foswalltest/v0.0.8', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      operationName: null,
      query: `
        {
          tokens(orderBy: tokenId) {
            tokenId
            tokenURI
            expression
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
    if (token.expression !== 'NULLIFIED' && token.expression !== 'CLAIMED') {
      let tokenData = JSON.parse(atob(token.tokenURI.split(",")[1]));
      return {
        tokenId: token.tokenId, 
        imageData: tokenData.image_data
      };
    }
  }).filter(Boolean); // Filter out any undefined values
  console.log(cardData)

  return cardData;
}
