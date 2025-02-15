<template>
  <v-card class="card elevation-24 rounded-xl">
    <div class="d-flex flex-row">
      <div class="w-50">
        <v-img :src="imageSrc"></v-img>
      </div>
      <div class="d-flex flex-column">
        <div class="ma-4">
          <h3>{{ props.entity.name }}</h3>
          <!--  <p class="mt-2">
            {{ description() }}
          </p> -->
        </div>
        <div width="100%" class="mt-2 action-button">
          <v-btn @click="openEditModal()" class="button-width primary-button"
            >Bearbeiten</v-btn
          >
        </div>
      </div>
    </div>
  </v-card>
</template>
<script lang="ts" setup>
import { useEntityStore } from "@/data/store/entity/EntityStore";
import { storeToRefs } from "pinia";
/*   import moment from "moment";
 */ import { ref, onMounted } from "vue";

const props = defineProps(["entity"]);
const selectedEntityForEdit = storeToRefs(useEntityStore());
const imageSrc = ref("");

onMounted(getImageForEntity);

async function getImageForEntity() {
  imageSrc.value = await useEntityStore().getImageForEntity(props.entity?.id);
}

function formatDate(date: Date) {
  return moment(String(date)).format("DD.MM.YYYY");
}

function openEditModal() {
  useEntityStore().setSelectedEntityForEdit(props.entity);
  useEntityStore().triggerEditEntityModuleActive();
}
</script>
<style scoped>
.card {
  width: 27vw;
  height: 22vh;
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
.image {
  width: 175px !important;
  height: 175px !important;
}
.button-width {
  width: 80% !important;
}
</style>
