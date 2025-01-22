import { ref, watch } from 'vue';
import { useSuggestions } from '@/entities/suggestion/model/useSuggestions';
const currentSuggestion = ref({});

export const useAutocomplete = () => {
  const query = ref('');
  const focused = ref(false);
  const activeIndex = ref(-1);
  const {
    suggestions,
    loading,
    loadSuggestions
  } = useSuggestions();
  const handleInput = (value) => {
    query.value = value;
  };

  const handleKeydown = (event) => {
    if (event.key === 'ArrowDown' && suggestions.value.length) {
      activeIndex.value = (activeIndex.value + 1) % suggestions.value.length;
    } else if (event.key === 'ArrowUp' && activeIndex.value > -1 && suggestions.value) {
      activeIndex.value =
        (activeIndex.value - 1 + suggestions.value.length) % suggestions.value.length;
    } else if (event.key === 'Enter' && activeIndex.value >= 0) {
      query.value = suggestions.value[activeIndex.value].name;
      currentSuggestion.value = suggestions.value[activeIndex.value]
      console.log(currentSuggestion.value);
      activeIndex.value = -1;
    }
  };

  watch(query, (newQuery) => {
    console.log(currentSuggestion.value)
    if (newQuery) {
      loadSuggestions(newQuery);
    }
  });

  return {
    query,
    focused,
    activeIndex,
    suggestions,
    loading,
    currentSuggestion,
    handleInput,
    handleKeydown,
  };
};
