<template>
  <form @submit.prevent="onSubmit">
    <InterestsGrid
      v-model="interests"
      @update:model-value="setFieldValue('interests', $event)"
    />
    <div v-if="errors.interests" class="p-error">
      {{ errors.interests }}
    </div>
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
import InterestsGrid from "../InterestsGrid.vue";
import PrimeButton from "primevue/button";
import {
  interestsSchema,
  type InterestsForm,
} from "../../composables/onboarding";
import { useForm } from "vee-validate";
import { ref } from "vue";
import { Genre } from "../../data/ticketmaster";

const { handleSubmit, errors, setFieldValue } = useForm<InterestsForm>({
  validationSchema: interestsSchema,
  initialValues: {
    interests: [],
  },
});

const interests = ref<Genre[]>([]);

const emits = defineEmits<{
  (e: "submit", payload: InterestsForm): void;
}>();

const onSubmit = handleSubmit((values) => {
  console.log("interests form values", values);
  emits("submit", values);
});
</script>

<style scoped></style>
