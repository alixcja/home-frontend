<template>
  <v-tabs v-model="tab" color="#1e1c1b">
    <v-tab value="entities">Entitäten</v-tab>
    <v-tab value="restaurants">Restaurants</v-tab>
  </v-tabs>
</template>
<script lang="ts" setup>
const tab = defineModel();
</script>
