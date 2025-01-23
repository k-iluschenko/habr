<script setup lang="ts">
import type { PropType } from 'vue';

defineProps({
  alias: String as PropType<string>
});
const emit = defineEmits<{
  (e: 'clear', label?: string): void,
}>();
</script>

<template>
<div :class="$style.chip">
  <span>@{{ alias }}</span>
  <span @click.prevent="emit('clear', alias)">x</span>
</div>
</template>

<style module lang="scss">
  .chip {
    background-color: #78A1B5;
    color: #FFFFFF;
    font-size: 12px;
    padding: 4px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    width: fit-content;
    border-radius: 2px;
    cursor: default;

    & span:last-child {
      cursor: pointer;
    }
  }
</style>
