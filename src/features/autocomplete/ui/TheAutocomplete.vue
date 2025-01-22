<script setup lang="ts">
import { useAutocomplete } from '../model/useAutocomplete.ts';
import SuggestionList from '@/entities/suggestion/ui/SuggestionList.vue';
import HChip from "@/shared/HChip/HChip.vue";

const {
  query,
  activeIndex,
  suggestions,
  loading,
  handleInput,
  handleKeydown,
  currentSuggestion
} = useAutocomplete();

const selectSuggestion = (index: number) => {
  currentSuggestion.value = suggestions.value[index];
  query.value = suggestions.value[index].name ?? suggestions.value[index].alias;
};

const clearCurrentSuggestion = () => {
  currentSuggestion.value = null;
}
</script>
<template>
  <div class="autocomplete" @keydown="handleKeydown">
    <div>
      <HChip v-if="currentSuggestion?.alias" :label="currentSuggestion?.alias" @clear="clearCurrentSuggestion"></HChip>
      <input
        type="text"
        v-model="query"
        @input="handleInput($event?.target?.value)"
        :aria-expanded="suggestions.length > 0"
        aria-autocomplete="list"
      />
    </div>
    <SuggestionList
      v-if="suggestions.length > 0"
      :suggestions="suggestions"
      :activeIndex="activeIndex"
      @selectSuggestion="selectSuggestion"
    />
    <div v-if="loading" class="loading">Loading...</div>
  </div>
</template>

<style scoped>
  .autocomplete {
    position: relative;
    width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: end;
  }

  input {
    width: 300px;
  }

  .loading {
    font-size: 12px;
    color: #888;
  }
</style>
