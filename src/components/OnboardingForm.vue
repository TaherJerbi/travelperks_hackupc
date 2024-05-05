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
      <SelectHotelForm city="Dublin" @submit="handleSelectHotelFormSubmit" />
    </TabPanel>
  </TabView>
</template>

<script setup lang="ts">
import PersonalForm from "./steps/PersonalForm.vue";
import TravelDetailsForm from "./steps/TravelDetailsForm.vue";
import InterestsForm from "./steps/InterestsForm.vue";
import SelectHotelForm from "./steps/SelectHotelForm.vue";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import type {
  InterestsForm as InterestsFormValues,
  PersonalInfoForm,
  TravelDetailsForm as TravelDetailsFormValues,
} from "../composables/onboarding";
import { ref } from "vue";

const tabIndex = ref(0);

function handlePersonalFormSubmit(payload: PersonalInfoForm) {
  console.log("personal form values", payload);
  tabIndex.value++;
  console.log("tab index", tabIndex.value);
}

function handleTravelDetailsFormSubmit(payload: TravelDetailsFormValues) {
  console.log("travel details form values", payload);
  tabIndex.value++;
}

function handleInterestsFormSubmit(payload: InterestsFormValues) {
  console.log("interests form values", payload);
  tabIndex.value++;
}

function handleSelectHotelFormSubmit(hotelId: number) {
  console.log("selected hotel id", hotelId);
}
</script>

<style>
.p-tabview-nav-container {
  display: none;
}
</style>
