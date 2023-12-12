interface GraphQLResponse<T> {
  data: T;
  errors: GraphQLError[];
}

interface GraphQLError {
  message: string;
}

export async function sendRequest<T>(
  url: string,
  query: string,
  headers: Record<string, string> = {},
  variables: Record<string, string> = {}
) {
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

    const data: GraphQLResponse<T> = await res.json();

    if (res.ok) {
      return { data: data.data, error: null };
    } else {
      throw new Error(data.errors?.map((error) => error.message).join('\n'));
    }
  } catch (error) {
    return { data: null, error };
  }
}
