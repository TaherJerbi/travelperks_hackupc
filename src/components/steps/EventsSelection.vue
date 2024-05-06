<template>
  <div>
    <h2>Events Selection</h2>
    <div v-if="props.events.length === 0">No events found</div>
    <div
      v-for="event in props.events"
      :key="event.id"
      class="shadow-5 my-4 border-round-xl surface-100 flex flex-column align-items-stretch gap-2 border-round-lg overflow-hidden relative"
      @click="toggleEvent(event)"
      :class="{
        'shadow-6 bg-green-100': selectedEvents.includes(event.id),
      }"
    >
      <Tag class="absolute m-2" severity="warning">
        <i class="pi pi-user" /><span class="text-sm pl-2">{{
          Math.floor(Math.random() * 100)
        }}</span>
      </Tag>
      <img :src="event.images[0].url" alt="Event image" height="200" />
      <div class="px-4">
        <p class="font-semibold">{{ event.name }}</p>
        <div class="flex justify-content-between">
          <p class="text-500">{{ event._embedded.venues[0].name }}</p>
          <p class="text-500">{{ event.dates.start.localDate }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { TicketmasterEvent } from "../../data/ticketmaster";
import Tag from "primevue/tag";
import PrimeButton from "primevue/button";

const props = defineProps<{
  events: TicketmasterEvent[];
}>();

const selectedEvents = ref<string[]>([]);

function toggleEvent(event: TicketmasterEvent) {
  if (selectedEvents.value.includes(event.id)) {
    selectedEvents.value = selectedEvents.value.filter((id) => id !== event.id);
  } else {
    selectedEvents.value.push(event.id);
  }
}
</script>

<style scoped>
img {
  object-fit: cover;
  width: 100%;
}
</style>
