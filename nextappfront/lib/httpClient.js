export const fetcher = async (url, options = {}) => {
  try {
    console.log(url);
    const response = await fetch(url, options);
    const data = await response.json();
    if (!response.ok) {
      throw new Error();
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const nextApiFetcher = async (url, options, setError, setUser) => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    if (!response.ok) {
      setError(data);
    }
    const { user } = data;
    setUser(user);
  } catch (error) {
    console.log(error);
    // console.log('Something went wrong');
  }
};
