<template>
  <div id="app">
    <div>
      <div :class="$style.cardWrapper">
        Вывод в App:
        <HCardMini
          v-if="currentSuggestion"
          :class="$style.card"
          :suggestion="currentSuggestion"
        ></HCardMini>
      </div>
      <TheAutocomplete></TheAutocomplete>
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
import HCardMini from '@/shared/HCardMini/HCardMini.vue';
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

<style module lang="scss">
  .cardWrapper {
    margin: 40px;
  }

  .card {
    border: 1px solid #cccccc;
    width: 200px;
  }
</style>
