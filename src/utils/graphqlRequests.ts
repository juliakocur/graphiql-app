export const sendRequest = async (
  url: string,
  query: string,
  headers: Record<string, string> = {},
  variables: Record<string, string> = {}
) => {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });
    if (!res.ok) {
      throw new Error(`Error! Status: ${res.status}`);
    }
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
