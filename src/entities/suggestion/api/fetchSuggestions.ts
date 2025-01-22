import axios, {type AxiosResponse, type CancelToken } from 'axios';
import type {Suggestions} from "@/shared/types/suggestions.ts";

interface FetchSuggestions {
  data: Suggestions
}
export const fetchSuggestions = async (query: string, cancelToken: CancelToken) => {
  try {
    const url = 'https://habr.com/kek/v2/publication/suggest-mention';
    const {data} = await axios.get<FetchSuggestions, AxiosResponse<FetchSuggestions>>(url, {
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
