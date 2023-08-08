export async function tokenData() {
  const response = await fetch('https://api.studio.thegraph.com/query/47271/foswalltest/version/latest', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      operationName: null,
      query: `
        {
          tokens {
            tokenId
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
  console.log(data);
  const tokens = data.data.tokens;
  const cardData = tokens.map(token => {
    let tokenData = JSON.parse(atob(token.tokenURI.split(",")[1]));
    return {
      tokenId: token.tokenId, 
      imageData: tokenData.image_data
    };
  });

  return cardData;
}
