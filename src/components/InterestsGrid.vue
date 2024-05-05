<template>
  <div></div>
  <div v-for="segment in segments" :key="segment.name">
    <div class="flex justify-content-between items-center">
      <p class="text-lg font-semibold text-surface-800">{{ segment.name }}</p>
    </div>
    <TransitionGroup
      name="list"
      tag="div"
      class="flex gap-2 flex-wrap justify-content-start"
    >
      <div
        v-for="genre in segment.genres.slice(
          0,
          segments_expanded[segment.name] ? segment.genres.length : 4
        )"
        :key="genre"
        class="px-3 py-3 text-sm border-round-xl"
        :class="
          props.modelValue.includes(genre)
            ? 'bg-primary-500 text-white'
            : 'surface-200'
        "
        @click="handleGenreClick(genre)"
      >
        {{ genre }}
      </div>
    </TransitionGroup>
    <PrimeButton
      class="mt-2"
      @click="
        segments_expanded[segment.name] = !segments_expanded[segment.name]
      "
      text
    >
      {{ segments_expanded[segment.name] ? "See less" : "See more" }}
    </PrimeButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Genre, SEGMENTS } from "../data/ticketmaster";
import PrimeButton from "primevue/button";

const segments = ref(SEGMENTS);
const segments_expanded = ref(
  SEGMENTS.reduce((acc, curr) => {
    acc[curr.name] = false;
    return acc;
  }, {} as Record<string, boolean>)
);
const props = defineProps<{
  modelValue: Genre[];
}>();
const emit = defineEmits<{
  (e: "update:modelValue", payload: Genre[]): void;
}>();

function handleGenreClick(genre: Genre) {
  if (props.modelValue.includes(genre)) {
    const newValue = props.modelValue.filter((g) => g !== genre);
    emit("update:modelValue", newValue);
  } else {
    emit("update:modelValue", [...props.modelValue, genre]);
  }
}
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.2s ease-in-out;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
}
</style>
