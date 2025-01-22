<template>
  <div id="app">
    <div>
      <h1>Саджест на Vue 3</h1>
      <TheAutocomplete></TheAutocomplete>
    </div>
    <div>
      <h1>UI</h1>
      <div>
        <HChip
          label="@mail"
          @clear="onClear"
        ></HChip></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import HChip from "@/shared/HChip/HChip.vue";
import TheAutocomplete from "@/features/autocomplete/ui/TheAutocomplete.vue";

const onClear = () => {
  console.log('app HCip @clear')
}
</script>

<style>
  #app {
    max-width: 600px;
    margin: 50px auto;
    font-family: Arial, sans-serif;
    display: flex;
    gap: 20px;
  }
</style>
