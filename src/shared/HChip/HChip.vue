<script setup lang="ts">
defineProps({
  label: String
})
const emit = defineEmits<{
  (e: 'clear'): void,
}>();
</script>

<template>
<div :class="$style.chip">
  <span>@{{label}}</span>
  <span @click.prevent="emit('clear')">x</span>
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
    gap: 10px;
    width: fit-content;
    border-radius: 2px;
    cursor: default;

    & span:last-child {
      cursor: pointer;
    }
  }
</style>
