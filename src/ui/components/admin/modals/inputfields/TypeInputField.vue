<template>
  <v-autocomplete
    label="Typ"
    bg-color="#F6F4F1"
    :items="props.allEntities"
    v-model="modelValue"
    :hide-details="true"
    class="pb-2"
    required="true"
  ></v-autocomplete>
</template>
<script setup lang="ts">

const props = defineProps(["allEntities"]);
const modelValue = defineModel<BookingEntityType | undefined>();
</script>
