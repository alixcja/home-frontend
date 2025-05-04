<template>
  <v-card class="card elevation-24 rounded-xl">
    <div class="d-flex flex-row">
      <div class="w-33">
        <v-img
          :src="imageSrc"
          :cover="true"
          aspect-ratio="1"
          height="100%"
          width="100%"
        ></v-img>
      </div>
      <div class="d-flex flex-column">
        <div class="ma-4">
          <h3>{{ props.entity.name }}</h3>
          <h5 v-if="props.entity.isArchived">Archiviert</h5>
          <h5 v-else>Nicht archviert</h5>
        </div>
        <div width="100%" class="mt-2 action-button">
          <ActionButton
            v-if="props.type === 'shop'"
            button-text="Menükarte"
            @action="openMenuCardModal()"
            class="button-width primary-button mr-2"
          />
          <ActionButton
            button-text="Bearbeiten"
            @action="openEditModal()"
            class="button-width primary-button"
          />
        </div>
      </div>
    </div>
  </v-card>
</template>
<script lang="ts" setup>
import { useEntityStore } from "@/data/store/entity/EntityStore";
import ActionButton from "./ActionButton.vue";
/*   import moment from "moment";
 */ import { ref, onMounted } from "vue";
import { useShopStore } from "@/data/store/ShopStore";

const props = defineProps(["entity", "type"]);
const imageSrc = ref("");

onMounted(getImageForEntity);

async function getImageForEntity() {
  if (props.type === "entity") {
    imageSrc.value = await useEntityStore().getImageForEntity(props.entity?.id);
  } else if (props.type === "shop") {
    imageSrc.value = await useShopStore().getImageForShop(props.entity.id);
  }
}

function openEditModal() {
  if (props.type === "entity") {
    useEntityStore().setSelectedEntityForEdit(props.entity);
    useEntityStore().triggerEditEntityModuleActive();
  } else if (props.type === "shop") {
    useShopStore().setSelectedShopForEdit(props.entity);
    useShopStore().triggerEditShopModuleActive();
  }
}

function openMenuCardModal() {
  useShopStore().setSelectedShopForMenuCardsEdit(props.entity);
  useShopStore().triggerEditMenuCardsForShopModuleActive();
}
</script>
<style scoped>
.card {
  width: 22vw;
  height: 18vh;
  max-height: 27vh;
  margin-top: 16px;
  margin-bottom: 16px;
  margin-right: 24px;
}

.action-button {
  position: absolute;
  right: 16px;
  bottom: 16px;
  display: flex;
  justify-content: end;
  z-index: 20;
}
</style>
