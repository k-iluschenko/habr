<script setup lang="ts">
import { useAutocomplete } from '../model/useAutocomplete.ts';
import SuggestionList from '@/entities/suggestion/ui/SuggestionList.vue';
import HChip from '@/shared/HChip/HChip.vue';
import { type PropType } from 'vue';

import { debounce } from '@/shared/utils/debounce.ts';
import HLoader from '@/shared/HLoader/HLoader.vue';
const props = defineProps({
  required: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  label: {
    type: String as PropType<string>,
    default: 'Пользователь или компания'
  },
  placeholder: {
    type: String as PropType<string>,
    default: 'Введите логин'
  },
  multiple: {
    type: Boolean as PropType<boolean>,
    default: false
  },
});
const {
  query,
  focused,
  activeIndex,
  suggestions,
  loading,
  handleInput,
  handleKeydown,
  currentSuggestion,
  currentSuggestionMultiple,
  errorMessage
} = useAutocomplete();

const onChange = debounce((value: HTMLInputElement) => {
  handleInput(value.value);
}, 300);


const selectSuggestion = (index: number) => {
  if (props.multiple) {
    currentSuggestionMultiple.value.push(suggestions.value[index]);
  } else {
    currentSuggestion.value = suggestions.value[index];
  }

  query.value = '';
  focused.value = false;
};

const clearCurrentSuggestion = () => {
  currentSuggestion.value = null;
};

const clearMultipleCurrentSuggestion = (value?: string) => {
  currentSuggestionMultiple.value = [...currentSuggestionMultiple.value.filter((item) => {
    return item.alias !== value;
  })];
};
</script>
<template>
  <div
    :class="$style.autocomplete"
    @keydown="handleKeydown"
  >
    <p :class="$style.label">
      <span
        v-if="required"
        :class="$style.required"
      >*</span>
      {{ label }}
    </p>
    <div :class="$style.inputWrapper">
      <template v-if="multiple">
        <HChip
          v-for="suggestion in currentSuggestionMultiple"
          :key="suggestion.alias"
          :alias="suggestion.alias"
          @clear="clearMultipleCurrentSuggestion"
        ></HChip>
      </template>
      <template v-else-if="currentSuggestion?.alias">
        <HChip
          :alias="currentSuggestion?.alias"
          @clear="clearCurrentSuggestion"
        ></HChip>
      </template>
      <input
        v-if="multiple || !currentSuggestion?.alias "
        type="text"
        :value="query"
        :placeholder="placeholder"
        @input="onChange($event.target as HTMLInputElement)"
        @focus="focused = true"
        @blur="focused = false"
        :aria-expanded="focused && suggestions.length > 0"
        aria-autocomplete="list"
      />
      <HLoader v-if="loading"></HLoader>
    </div>
    <SuggestionList
      v-if="focused && suggestions.length > 0"
      :suggestions="suggestions"
      :activeIndex="activeIndex"
      :visible="focused"
      @selectSuggestion="selectSuggestion"
    />
    <div v-if="errorMessage">{{ errorMessage }}</div>
  </div>
</template>

<style module lang="scss">
  .autocomplete {
    position: relative;
    width: 600px;
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: end;

    @include respond-to(sm) {
      width: 300px;
    }
  }

  .label {
    align-self: start;
    margin: 0;
  }

  .inputWrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 2px;
    width: 100%;
    border: 1px solid #cccccc;
    border-radius: 2px;
    padding: 4px;
    outline: black;
    min-height: 32px;
  }

  input {
    flex-grow: 1;
    min-width: 150px;
    border: none;
    outline: none;
  }

  .loading {
    font-size: 12px;
    color: #888;
  }

  .required {
    color: red;
  }
</style>
