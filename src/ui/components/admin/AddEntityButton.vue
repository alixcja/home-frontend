<template>
  <v-btn class="primary-button add-button" @click="toggleAddEntityModal"
    >Hinzufügen</v-btn
  >
</template>
<script lang="ts" setup>
import { useEntityStore } from "@/data/store/entity/EntityStore";
import { useShopStore } from "@/data/store/ShopStore";
const props = defineProps({type: String})

function toggleAddEntityModal() {
  if (props.type === "entities") {
    useEntityStore().triggerAddEntityModuleActive();
  } else {
    useShopStore().triggerAddShopModuleActive();
  }
}
</script>
<style scoped>
.add-button {
  width: 10% !important;
}
</style>
