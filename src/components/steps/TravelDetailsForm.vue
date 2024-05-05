<template>
  <p class="text-center text-2xl font-semibold text-surface-800 mb-6">
    Travel Details
  </p>
  <form @submit.prevent="onSubmit">
    <DropdownWithValidation
      name="departureCity"
      label="Departure City"
      :options="
        CITIES.map((city, index) => ({
          name: CITIES_WITH_COUNTRY[index],
          value: city,
        }))
      "
      required
      forward-class="w-full"
      size="large"
    />
    <DropdownWithValidation
      name="arrivalCity"
      label="Arrival City"
      :options="
        CITIES.map((city, index) => ({
          name: CITIES_WITH_COUNTRY[index],
          value: city,
        }))
      "
      required
      forward-class="w-full"
      size="large"
    />
    <p for="dates" class="mb-2">
      Travel Dates <span class="text-red-300">*</span>
    </p>
    <Calendar
      name="dates"
      v-model="dates"
      showIcon
      :showOnFocus="false"
      :min-date="new Date()"
      selection-mode="range"
      :manualInput="false"
      class="w-full mb-5"
    />

    <div class="flex justify-content-between w-full">
      <PrimeButton
        type="button"
        label="Cancel"
        text
        severity="secondary"
        size="large"
      />
      <PrimeButton type="submit" label="Next" size="large" />
    </div>
  </form>
</template>

<script setup lang="ts">
import {
  travelDetailsSchema,
  type TravelDetailsForm,
} from "../../composables/onboarding";
import { CITIES, CITIES_WITH_COUNTRY } from "../../data/travelperks";
import { useForm } from "vee-validate";
import DropdownWithValidation from "../inputs/DropdownWithValidation.vue";
import PrimeButton from "primevue/button";
import Calendar from "primevue/calendar";
import { ref, watch } from "vue";

const dates = ref<(Date | null)[]>([]);

const { handleSubmit, setFieldValue } = useForm<TravelDetailsForm>({
  validationSchema: travelDetailsSchema,
});

watch(dates, (newDates) => {
  if (!newDates) return;
  const [departureDate, arrivalDate] = newDates;
  if (departureDate && arrivalDate) {
    setFieldValue("departureDate", departureDate);
    setFieldValue("arrivalDate", arrivalDate);
  }
});

const emits = defineEmits<{
  (e: "submit", payload: TravelDetailsForm): void;
}>();

const onSubmit = handleSubmit((values) => {
  console.log("travel details", values);
  emits("submit", values);
});
</script>

<style scoped></style>
