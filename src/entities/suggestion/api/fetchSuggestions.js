import axios from 'axios';

export const fetchSuggestions = async (query, cancelToken) => {
  try {
    const {data} = await axios.get('https://habr.com/kek/v2/publication/suggest-mention', {
      params: { q: query },
      cancelToken,
    });
    return data.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Request canceled:', error.message);
    } else {
      console.error(error);
    }
    return [];
  }
};
