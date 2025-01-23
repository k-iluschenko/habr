<script setup lang="ts">

</script>

<template>
  <span :class="$style.loader"></span>
</template>

<style module lang="scss">
  .loader {
    width: 20px;
    height: 20px;
    border: 3px solid #cccccc;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
