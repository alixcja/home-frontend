<template>
  <v-autocomplete
    label="Typ"
    bg-color="#F6F4F1"
    :items="props.allTypes"
    v-model="modelValue"
    :hide-details="true"
    class="pb-2"
    required="true"
  ></v-autocomplete>
</template>
<script setup lang="ts">
import { BookingEntityType } from '@/ts/entitytypes.enums';

const props = defineProps(["allTypes"]);
const modelValue = defineModel<BookingEntityType | undefined>();
</script>
