<template>
  <div class="field">
    <label :for="name"
      >{{ label
      }}<span v-if="required" class="text-red-300 inline"> *</span></label
    >
    <div class="input-with-spinner">
      <InputText
        size="large"
        :name="name"
        :autofocus="autofocus"
        v-model="value"
        :aria-describedby="`${name}-help`"
        :class="{ 'p-invalid': errorMessage && meta.touched }"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :step="step"
      >
      </InputText>
      <ProgressSpinner
        v-if="props.loading"
        class="spinner"
        style="width: 30px; height: 50px"
        strokeWidth="8"
        fill="var(--surface-ground)"
        animationDuration=".9s"
        aria-label="Custom ProgressSpinner"
      />
    </div>
    <small
      v-if="meta.touched && errorMessage"
      :id="`${name}-help`"
      class="p-error text-red-300"
      >{{ errorMessage }}</small
    >
  </div>
</template>

<script setup lang="ts">
import { toRef } from "vue";
import { useField } from "vee-validate";
import InputText from "primevue/inputtext";
import ProgressSpinner from "primevue/progressspinner";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "text",
  },
  autofocus: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  step: {
    type: Number,
    default: undefined,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const { errorMessage, value, meta } = useField<string>(toRef(props, "name"));
</script>

<style lang="postcss" scoped>
.field * {
  display: block;
}

.field input {
  width: 100%;
}

.input-with-spinner {
  display: flex;
  align-items: center;
  //padding: 5px;
}

.input-with-spinner .spinner {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
}
</style>
