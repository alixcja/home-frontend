<template>
  <v-btn class="primary-button add-button" @click="toggleAddEntityModal"
    >Hinzufügen</v-btn
  >
</template>
<script lang="ts" setup>
import { useEntityStore } from "@/data/store/entity/EntityStore";

function toggleAddEntityModal() {
  useEntityStore().triggerAddEntityModuleActive();
}
</script>
<style scoped>
.add-button {
  width: 10% !important;
}
</style>
