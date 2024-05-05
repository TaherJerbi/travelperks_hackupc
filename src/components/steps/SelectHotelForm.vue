<template>
  <div>
    <p class="text-lg font-semibold">Select a Hotel</p>

    <div class="mt-4">
      <div
        v-for="hotel in hotels"
        :key="hotel.hotel_id"
        class="shadow-3 border-round-lg overflow-hidden mb-4 relative"
        @click="selectedHotel = hotel.hotel_id"
        :class="selectedHotel === hotel.hotel_id ? 'shadow-6' : ''"
      >
        <Tag class="absolute m-2" severity="warning">
          <i class="pi pi-user mr-2"></i>
          {{
            travelersForHotels.find((t) => t.hotel_id === hotel.hotel_id)
              ?.travelers ?? 0 > 100
              ? "100+"
              : travelersForHotels.find((t) => t.hotel_id === hotel.hotel_id)
                  ?.travelers
          }}
        </Tag>
        <Image :src="hotel.photo5" />
        <div class="flex justify-content-between align-items-center px-4">
          <p class="text-xl font-semibold">{{ hotel.hotel_name }}</p>
          <p class="text-sm font-bold text-500">
            {{ hotel.rates_from }} {{ hotel.rates_currency }}
          </p>
        </div>
      </div>
      <PrimeButton
        v-if="selectedHotel"
        @click="emit('submit', selectedHotel)"
        label="Confirm"
        class="w-full"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Image from "primevue/image";
import PrimeButton from "primevue/button";
import { computed, ref } from "vue";
import { getHotelsForCity, getTravelersForHotel } from "../../data/hotels";
import Tag from "primevue/tag";

const props = defineProps<{
  city: string;
}>();

const hotels = computed(() => {
  return getHotelsForCity(props.city);
});

const selectedHotel = ref<number | null>(null);

const emit = defineEmits<{
  (e: "submit", payload: number): void;
}>();

const travelersForHotels = computed(() => {
  return hotels.value.map((hotel) => {
    return {
      hotel_id: hotel.hotel_id,
      travelers: getTravelersForHotel(hotel.hotel_id).length,
    };
  });
});
</script>

<style scoped></style>
