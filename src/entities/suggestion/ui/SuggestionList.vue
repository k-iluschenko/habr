<script setup lang="ts">
import HCardMini from "@/shared/HCardMini/HCardMini.vue";

defineProps({
  suggestions: Array,
  visible: Boolean,
  activeIndex: Number,
});

const emit = defineEmits(['selectSuggestion'])

function onSelectSuggestion(index) {
  console.log(index);
  emit('selectSuggestion', index)
}
</script>

<template>
  <ul
    v-if="suggestions.length"
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
      ></HCardMini>
    </li>
  </ul>
</template>

<style module lang="scss">
  .suggestionList {
    list-style: none;
    margin: 0;
    padding: 0;
    background: white;
    border: 1px solid #ccc;
    height: 200px;
    width: 200px;
    overflow: auto;
  }

  .suggestionItem {
    cursor: pointer;
  }
</style>
