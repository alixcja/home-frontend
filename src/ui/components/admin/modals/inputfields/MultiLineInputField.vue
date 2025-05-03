<template>
  <v-textarea
    :label="props.labelName"
    bg-color="#F6F4F1"
    v-model="modelValue"
    :hide-details="true"
  ></v-textarea>
</template>
<script setup lang="ts">
const modelValue = defineModel<string | undefined>();
const props = defineProps(["labelName"]);
</script>
