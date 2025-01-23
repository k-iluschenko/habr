import { ref } from 'vue';
import { fetchSuggestions } from '../api/fetchSuggestions.js';
import axios, { type CancelTokenSource } from 'axios';
import type { Suggestions } from '@/shared/types/suggestions.ts';

export const useSuggestions = () => {
  const suggestions = ref<Suggestions>([]);
  const loading = ref<boolean>(false);
  const cancelTokenSource = ref<CancelTokenSource | null>(null);
  const errorMessage = ref<string>();

  const loadSuggestions = async(query: string) => {
    if (cancelTokenSource.value) {
      cancelTokenSource.value.cancel('Operation canceled by the user.');
    }
    cancelTokenSource.value = axios.CancelToken.source();
    suggestions.value = [];
    if (query.length >= 3) {
      loading.value = true;
      try {
        suggestions.value = await fetchSuggestions(query, cancelTokenSource.value.token);
      } catch (error) {
        const e = error as Error;
        errorMessage.value = e.message;
      } finally {
        loading.value = false;
      }
    }
  };

  return {
    suggestions,
    loading,
    errorMessage,
    loadSuggestions
  };
};
