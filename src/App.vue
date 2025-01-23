<template>
  <div id="app">
    <div>
      <TheAutocomplete></TheAutocomplete>
      <div>
        Выбран: {{ currentSuggestion?.alias }}
      </div>
    </div>
    <div>
      <TheAutocomplete
        placeholder="Поиск пользователя"
        label="Поиск"
        multiple
        required
      ></TheAutocomplete>
    </div>
  </div>
</template>

<script setup lang="ts">
import TheAutocomplete from '@/features/autocomplete/ui/TheAutocomplete.vue';
import { useAutocomplete } from '@/features/autocomplete/model/useAutocomplete';
const {
  currentSuggestion
} = useAutocomplete();
</script>

<style>
  #app {
    max-width: 600px;
    margin: 50px auto;
    font-family: Arial, sans-serif;

    display: flex;
    flex-direction: column;
    gap: 20px;
  }
</style>
