<template>
  <v-dialog v-model="isEditEntityModuleActive" class="dialog">
    <EditEntityModal />
  </v-dialog>
  <div class="ma-6">
    <div class="d-flex flex-row mb-4">
      <h1 class="header">Admin</h1>
    </div>
    <EntityTab />
    <div class="d-flex flex-wrap">
      <div v-for="entity in allEntities">
        <EntityCard :entity="entity" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import EntityTab from "../components/admin/EntityTab.vue";
import { onMounted } from "vue";
import { useEntityStore } from "@/data/store/entity/EntityStore";
import { storeToRefs } from "pinia";
import EntityCard from "@/ui/components/admin/EntityCard.vue";
import EditEntityModal from "@/ui/components/admin/EditEntityModal.vue";

const { isEditEntityModuleActive } = storeToRefs(useEntityStore());
const { allEntities } = storeToRefs(useEntityStore());

onMounted(() => {
  useEntityStore().getAllEntites();
});
</script>
<style lang="scss">
.logo {
  width: 15%;
}
.login-button {
  width: 5%;
}
.content {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
