<template>
  <TabView :active-index="tabIndex">
    <TabPanel>
      <PersonalForm @submit="handlePersonalFormSubmit" />
    </TabPanel>
    <TabPanel>
      <TravelDetailsForm @submit="handleTravelDetailsFormSubmit" />
    </TabPanel>
    <TabPanel>
      <InterestsForm @submit="handleInterestsFormSubmit" />
    </TabPanel>
    <TabPanel>
      <SelectHotelForm
        v-if="city"
        :city="city"
        @submit="handleSelectHotelFormSubmit"
      />
    </TabPanel>
    <TabPanel>
      <EventsSelection :events="ticketmasterEvents" />
    </TabPanel>
  </TabView>
</template>

<script setup lang="ts">
import PersonalForm from "./steps/PersonalForm.vue";
import TravelDetailsForm from "./steps/TravelDetailsForm.vue";
import InterestsForm from "./steps/InterestsForm.vue";
import SelectHotelForm from "./steps/SelectHotelForm.vue";
import EventsSelection from "./steps/EventsSelection.vue";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import type {
  InterestsForm as InterestsFormValues,
  PersonalInfoForm,
  TravelDetailsForm as TravelDetailsFormValues,
} from "../composables/onboarding";
import { ref } from "vue";
import { City } from "../data/travelperks";
import { Genre, TicketmasterEvent, getEvents } from "../data/ticketmaster";

const tabIndex = ref(0);
const city = ref<City | null>(null);
const selectedHotel = ref<number | null>(null);
const interests = ref<Genre[]>([]);
const ticketmasterEvents = ref<TicketmasterEvent[]>([]);

function handlePersonalFormSubmit(payload: PersonalInfoForm) {
  console.log("personal form values", payload);
  tabIndex.value++;
  console.log("tab index", tabIndex.value);
}

function handleTravelDetailsFormSubmit(payload: TravelDetailsFormValues) {
  console.log("travel details form values", payload);
  city.value = payload.arrivalCity;
  tabIndex.value++;
}

function handleInterestsFormSubmit(payload: InterestsFormValues) {
  console.log("interests form values", payload);
  interests.value = payload.interests;
  tabIndex.value++;
}

async function handleSelectHotelFormSubmit(hotelId: number) {
  console.log("selected hotel id", hotelId);
  selectedHotel.value = hotelId;

  // Fetch events
  ticketmasterEvents.value = await getEvents(city.value!, interests.value);
  tabIndex.value++;
}
</script>

<style>
.p-tabview-nav-container {
  display: none;
}
</style>
