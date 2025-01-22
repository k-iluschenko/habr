import { ref, watch } from 'vue';
import { useSuggestions } from '@/entities/suggestion/model/useSuggestions';
import type {Suggestion} from "@/shared/types/suggestions.ts";
const currentSuggestion = ref<Suggestion | null>(null);

export const useAutocomplete = () => {
  const query = ref<string>('');
  const focused = ref<boolean>(false);
  const activeIndex = ref<number>(-1);
  const {
    suggestions,
    loading,
    loadSuggestions
  } = useSuggestions();

  const handleInput = (value: string) => {
    query.value = value;
  };

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowDown' && suggestions.value.length) {
      activeIndex.value = (activeIndex.value + 1) % suggestions.value.length;
    } else if (event.key === 'ArrowUp' && activeIndex.value > -1 && suggestions.value) {
      activeIndex.value =
        (activeIndex.value - 1 + suggestions.value.length) % suggestions.value.length;
    } else if (event.key === 'Enter' && activeIndex.value >= 0) {
      const activeSuggestion = suggestions.value[activeIndex.value];
      query.value = activeSuggestion.name ?? activeSuggestion.alias;
      currentSuggestion.value = activeSuggestion
      activeIndex.value = -1;
    }
  };

  watch(query, async (newQuery) => {
    if (newQuery) {
      await loadSuggestions(newQuery);
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
