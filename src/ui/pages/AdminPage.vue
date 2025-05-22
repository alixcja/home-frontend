<template>
  <v-dialog v-model="isEditEntityModuleActive" class="adminDialog" persistent>
    <EditEntityModal />
  </v-dialog>
  <v-dialog v-model="isAddEntityModuleActive" class="adminDialog" persistent>
    <AddEntityModal />
  </v-dialog>
  <v-dialog v-model="isAddShopModuleActive" class="adminDialog" persistent>
    <AddShopModal />
  </v-dialog>
  <v-dialog v-model="isEditShopModalActive" class="adminDialog" persistent>
    <EditShopModal />
  </v-dialog>
  <v-dialog v-model="isMenuCardModalActive" class="adminDialog" persistent>
    <MenuCardsModal :entity="selectedShopForMenuCardsEditing" />
  </v-dialog>
  <div class="ma-6">
    <div class="d-flex flex-row mb-4">
      <h1 class="header">Admin</h1>
    </div>
    <div class="d-flex flex-row">
      <EntityTab v-model="currentSelected" />
      <v-spacer />
      <AddButton :type="currentSelected"/>
    </div>
    <div class="d-flex flex-wrap">
      <div v-if="currentSelected === 'entities'" v-for="entity in allEntities">
        <EntityCard :entity="entity" type="entity" />
      </div>
      <div v-if="currentSelected === 'restaurants'" v-for="entity in allShops">
        <EntityCard :entity="entity" type="shop" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useEntityStore } from "@/data/store/entity/EntityStore";
import { storeToRefs } from "pinia";
import EditEntityModal from "@/ui/components/admin/modals/entity/EditEntityModal.vue";
import AddEntityModal from "../components/admin/modals/entity/AddEntityModal.vue";
import AddButton from "../components/admin/AddEntityButton.vue";
import EntityTab from "../components/admin/EntityTab.vue";
import EntityCard from "@/ui/components/admin/EntityCard.vue";
import { useShopStore } from "@/data/store/ShopStore";
import EditShopModal from "../components/admin/modals/shop/EditShopModal.vue";
import MenuCardsModal from "../components/admin/modals/shop/MenuCardsModal.vue";
import AddShopModal from "../components/admin/modals/shop/AddShopModal.vue";

const { allEntities } = storeToRefs(useEntityStore());
const { allShops } = storeToRefs(useShopStore());

const { isEditEntityModuleActive, isAddEntityModuleActive } =
  storeToRefs(useEntityStore());

const {
  isAddShopModuleActive,
  isEditShopModalActive,
  isMenuCardModalActive,
  selectedShopForMenuCardsEditing,
} = storeToRefs(useShopStore());

const currentSelected = ref("entities");

onMounted(() => {
  useEntityStore().getAllEntites();
  useShopStore().getAllShops();
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
