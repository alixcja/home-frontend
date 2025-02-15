<template>
  <div class="ma-2 d-flex flex-row">
    <v-btn @click="$emit('confirm')" class="book-button">
      {{ props.confirmButtonTitle }}</v-btn
    >
    <v-spacer />
    <v-btn class="cancel-button" variant="outlined" @click="$emit('cancel')">
      {{ props.cancelButtonTitle || "Abbrechen" }}</v-btn
    >
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps({
  confirmButtonTitle: String,
  cancelButtonTitle: String,
});
</script>
<style scoped>
.book-button {
  width: 40%;
  background-color: #ff8200 !important;
}

.cancel-button {
  width: 40%;
  background-color: #1e1c1b !important;
  color: #f6f4f1;
}
</style>
