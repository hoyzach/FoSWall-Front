export async function tokenData() {
  const response = await fetch('https://api.studio.thegraph.com/query/47271/foswall/version/latest', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      operationName: null,
      query: `
        {
          tokens {
            id
            contentURI
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
    let tokenData = JSON.parse(atob(token.contentURI.split(",")[1]));
    return {
      tokenId: token.id, 
      imageData: tokenData.image_data
    };
  });

  return cardData;
}
