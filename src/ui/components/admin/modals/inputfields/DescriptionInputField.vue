<template>
  <v-textarea
    label="Beschreibung"
    bg-color="#F6F4F1"
    v-model="modelValue"
    :hide-details="true"
  ></v-textarea>
</template>
<script setup lang="ts">
const modelValue = defineModel<string | undefined>();
</script>
