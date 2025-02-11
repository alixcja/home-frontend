<template>
  <div class="ma-8 d-flex flex-row">
    <v-btn @click="$emit('return')" class="book-button">Abgabe</v-btn>
    <v-spacer />
    <v-btn
      class="cancel-button"
      variant="outlined"
      @click="$emit('cancel')"
      >Abbrechen</v-btn
    >
  </div>
</template>
<script lang="ts" setup></script>
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
