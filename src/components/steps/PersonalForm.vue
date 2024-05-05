<template>
  <div>
    <p class="text-center text-2xl font-semibold text-surface-800 mb-6">
      Welcome aboard!
    </p>
    <form @submit.prevent="onSubmit">
      <InputTextWithValidation
        name="name"
        label="Name"
        required
        placeholder="Jasser Braham"
      />
      <InputTextWithValidation
        name="email"
        label="Email"
        required
        placeholder="jasser@example.com"
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
  </div>
</template>

<script setup lang="ts">
import InputTextWithValidation from "../inputs/InputTextWithValidation.vue";
import PrimeButton from "primevue/button";
import {
  personalInfoSchema,
  type PersonalInfoForm,
} from "../../composables/onboarding";
import { useForm } from "vee-validate";

const initialValues = {
  name: "Jasser Braham",
  email: "jasser@example.com",
};
const { handleSubmit } = useForm({
  validationSchema: personalInfoSchema,
  initialValues,
});

const emits = defineEmits<{
  (e: "submit", payload: PersonalInfoForm): void;
}>();

const onSubmit = handleSubmit((values) => {
  console.log("personal form values", values);
  emits("submit", values);
});
</script>

<style scoped></style>
