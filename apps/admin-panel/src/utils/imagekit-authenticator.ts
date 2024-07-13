const authenticator = async () => {
  try {
    console.log((import.meta.env.VITE_API_REST_URL as string) + `/imagekit`);
    const response = await fetch(
      (import.meta.env.VITE_API_REST_URL as string) + `/imagekit`,
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`,
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    console.log({ signature });
    return { signature, expire, token };
  } catch (error) {
    console.log(error);
    throw new Error(
      `Authentication request failed: ${(error as Error).message}`,
    );
  }
};

export default authenticator;
