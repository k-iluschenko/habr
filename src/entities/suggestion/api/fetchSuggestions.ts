import axios, { type AxiosResponse, type CancelToken, isAxiosError } from 'axios';
import type { Suggestions } from '@/shared/types/suggestions.ts';

interface FetchSuggestions {
  data: Suggestions
}

export const fetchSuggestions = async(query: string, cancelToken: CancelToken) => {
  try {
    const url = 'https://habr.com/kek/v2/publication/suggest-mention';
    const { data } = await axios.get<FetchSuggestions, AxiosResponse<FetchSuggestions>>(url, {
      params: { q: query },
      cancelToken,
    });
    return data.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Request canceled:', error.message);
    } else {
      if (isAxiosError(error)) {
        if (error.status === 400) {
          throw new Error(`Попробуйте ввести другой запрос (${ error.status })`);
        }

        if (error.status === 500) {
          throw new Error('Ошибка на сервере');
        }

        if (error.response?.data.data) {
          throw new Error(error.response?.data.data.q[0]);
        }
      }

      console.error(error);
    }
    return [];
  }
};
