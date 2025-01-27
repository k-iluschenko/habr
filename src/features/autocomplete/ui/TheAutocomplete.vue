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
} = useAutocomplete(props.multiple);

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
        :aria-autocomplete="multiple ? 'list' : 'both'"
      />
      <HLoader
        v-if="loading"
        :class="$style.loader"
      ></HLoader>
    </div>
    <div :class="$style.suggestionsWrapper">
      <SuggestionList
        v-if="focused && suggestions.length > 0"
        :class="$style.suggestionsList"
        :suggestions="suggestions"
        :activeIndex="activeIndex"
        :visible="focused"
        @selectSuggestion="selectSuggestion"
      />
    </div>
    <div
      v-if="errorMessage"
      :class="$style.errorMessage"
    >{{ errorMessage }}</div>
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
    padding-inline-end: 30px;
  }

  .loading {
    font-size: 12px;
    color: #888;
  }

  .required {
    color: red;
  }

  .suggestionsWrapper {
    position: relative;
  }

  .suggestionsList {
    position: absolute;
    right: 0;
    z-index: 2;
  }

  .loader {
    position: absolute;
    right: 8px;
    bottom: 6px;
  }

  .errorMessage {
    color: red;
    font-size: 12px;
  }
</style>
