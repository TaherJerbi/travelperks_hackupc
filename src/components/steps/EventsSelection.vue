<template>
  <div>
    <h2>Events Selection</h2>
    <div v-if="props.events.length === 0">No events found</div>
    <div
      v-for="event in props.events"
      :key="event.id"
      class="shadow-5 my-2 border-round-xl surface-100 flex flex-column align-items-stretch gap-2"
    >
      <img :src="event.images[0].url" alt="Event image" height="200" />
      <div class="px-4">
        <p class="font-semibold">{{ event.name }}</p>
        <p class="text-500 mt-5">{{ event.dates.start.localDate }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TicketmasterEvent } from "../../data/ticketmaster";

const props = defineProps<{
  events: TicketmasterEvent[];
}>();
</script>

<style scoped>
img {
  object-fit: cover;
  width: 100%;
}
</style>
