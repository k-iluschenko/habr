import { ref } from 'vue';
import { fetchSuggestions } from '../api/fetchSuggestions';
import axios from 'axios';

export const useSuggestions = () => {
  const suggestions = ref([]);
  const loading = ref(false);
  const cancelTokenSource = ref(null);

  const loadSuggestions = async (query) => {
    if (cancelTokenSource.value) {
      cancelTokenSource.value.cancel('Operation canceled by the user.');
    }
    cancelTokenSource.value = axios.CancelToken.source();
    if (query.length >= 3) {
      loading.value = true;
      suggestions.value = await fetchSuggestions(query, cancelTokenSource.value.token)
      loading.value = false;
    }
  };

  return {
    suggestions,
    loading,
    loadSuggestions
  };
};
