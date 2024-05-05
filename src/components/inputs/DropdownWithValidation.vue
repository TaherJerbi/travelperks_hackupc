<template>
  <div class="field">
    <label for="type"
      >{{ label
      }}<span v-if="required" class="text-red-500 inline"> *</span></label
    ><br />

    <Dropdown
      :label="label"
      v-model="value"
      :options="options"
      :editable="editable"
      :size="size"
      optionLabel="name"
      optionValue="value"
      placeholder="Please select an option"
      :class="forwardClass"
    />

    <small id="email-help" class="p-error">{{ errorMessage }}</small>
  </div>
</template>

<script lang="ts" setup>
import { toRef } from "vue";
import { useField } from "vee-validate";
import Dropdown from "primevue/dropdown";
import type { PropType } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  options: {
    type: Array as PropType<{ name: string; value: string }[]>,
    required: true,
  },
  required: {
    type: Boolean,
    default: false,
  },
  editable: {
    type: Boolean,
    default: false,
  },
  forwardClass: {
    type: String,
    default: "",
  },
  size: {
    type: String,
    default: "",
  },
});

const { errorMessage, value } = useField(toRef(props, "name"));
</script>
