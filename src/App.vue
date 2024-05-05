<template>
  <div class="w-screen h-screen">
    <div class="onboarding shadow-4 px-5 py-4 border-round-xl mx-5">
      <OnboardingForm />
    </div>
  </div>
</template>

<script setup lang="ts">
import OnboardingForm from "./components/OnboardingForm.vue";
</script>

<style scoped>
.onboarding {
  margin-top: 20vh;
}
</style>
