<template>
  <div class="d-flex flex-row">
    <h2 class="header">Buchung</h2>
    <v-spacer />
    <v-btn color="#FF8200">Rückgabe</v-btn>
  </div>
  <SplitEntites entity="Spiele" />
</template>
<script setup lang="ts">
import SplitEntites from "../components/booking/SplitEntites.vue";
</script>
<style>
.header {
  color: #1e1c1b;
  font-size: 28px;
  font-weight: 700;
}

.button {
  font-size: 28px;
}
</style>
