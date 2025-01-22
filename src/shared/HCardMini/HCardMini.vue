<script setup lang="ts">
import userIcon from '/assets/img/user.svg'
import {computed} from "vue";
import type {Suggestion} from "@/shared/types/suggestions.ts";
import {SuggestionTypeEnum} from "@/shared/constants/suggestions.ts";

const props = defineProps<{
  isActive: boolean
  suggestion: NonNullable<Suggestion>
}>();

const prepareAlias = computed(() => {
  return props.suggestion.type === SuggestionTypeEnum.company
    ? 'Компания'
    : `@${props.suggestion.alias}`
})
</script>

<template>
  <div
    :class="[
      $style.cardMini,
      {[$style.isActive]: isActive}
    ]
  ">
    <img :src="suggestion?.avatar ?? userIcon" :alt="suggestion?.alias">
    <div :class="$style.memberInfo">
      <span v-if="suggestion?.name">{{suggestion.name}}</span>
      <span>{{ prepareAlias }}</span>
    </div>
  </div>
</template>

<style module lang="scss">
  .cardMini {
    display: flex;
    align-items: center;
    padding: 10px 8px;
    gap: 8px;

    &:hover {
      @extend .isActive
    }
  }

  .isActive {
    background-color: #cccccc;
  }

  img {
    width: 40px;
    height: 40px;
  }

  .memberInfo {
    display: flex;
    flex-direction: column;

    font-size: 10px;
    color: #888888;
    & span:first-child {
      font-size: 12px;
      font-weight: 500;
      color: #000;
    }
  }
</style>
