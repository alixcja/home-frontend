<template>
  <v-dialog v-model="isEditEntityModuleActive" class="adminDialog">
    <EditEntityModal />
  </v-dialog>
  <v-dialog v-model="isAddEntityModuleActive" class="adminDialog">
    <AddEntityModal />
  </v-dialog>
  <div class="ma-6">
    <div class="d-flex flex-row mb-4">
      <h1 class="header">Admin</h1>
    </div>
    <div class="d-flex flex-row">
      <EntityTab />
      <v-spacer /> 
      <AddEntityButton />
    </div>
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
import AddEntityModal from "../components/admin/AddEntityModal.vue";
import AddEntityButton from "../components/admin/AddEntityButton.vue";

const { isEditEntityModuleActive, isAddEntityModuleActive } = storeToRefs(useEntityStore());
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
