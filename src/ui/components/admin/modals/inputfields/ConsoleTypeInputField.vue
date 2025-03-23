<template>
  <v-text-field
    label="Konsolen-Typ"
    bg-color="#F6F4F1"
    v-model="modelValue"
    :hide-details="true"
    class="pb-2"
    required="true"
  ></v-text-field>
</template>
<script setup lang="ts">
const modelValue = defineModel<string | undefined>();
</script>
