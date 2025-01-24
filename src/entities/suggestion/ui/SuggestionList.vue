<script setup lang="ts">
import HCardMini from '@/shared/HCardMini/HCardMini.vue';
import type { Suggestions } from '@/shared/types/suggestions.ts';

defineProps<{
  suggestions: Suggestions,
  visible?: boolean,
  activeIndex: number,
}>();

const emit = defineEmits<{
(e: 'selectSuggestion', arg: number) : void,
}>();

function onSelectSuggestion(index: number) {
  emit('selectSuggestion', index);
}
</script>

<template>
  <ul
    :class="$style.suggestionList"
    role="listbox"
    :aria-expanded="visible"
  >
    <li
      v-for="(suggestion, index) in suggestions"
      :key="index"
      :class="[
        $style.suggestionItem
      ]"
      role="option"
      :aria-selected="index === activeIndex"
      @mousedown="onSelectSuggestion(index)"
    >
      <HCardMini
      :is-active="index === activeIndex"
      :suggestion="suggestion"
      :class="$style.card"
      ></HCardMini>
    </li>
  </ul>
</template>

<style module lang="scss">
  .suggestionList {
    list-style: none;
    margin: 0;
    padding: 0;
    background: #fff;
    border: 1px solid #ccc;
    max-height: 220px;
    width: 250px;
    overflow: auto;
    overscroll-behavior: contain;
    box-shadow: 0 7px 10px #e1dddd;
    scrollbar-width: thin;
  }

  .suggestionItem {
    cursor: pointer;
  }

  .card {
    &:hover{
      background-color: #cccccc;
    }
  }
</style>
