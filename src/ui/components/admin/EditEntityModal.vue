<template>
  <v-card class="card">
    <div class="d-flex flex-column">
      <p class="title">{{ selectedEntityForEdit?.name }} bearbeiten</p>
      <hr class="divider" />
      <div class="d-flex flex-row mx-4">
        <div class="d-flex flex-column mr-5 w-50">
          <v-img height="80%" width="80%" :src="imageSrc"></v-img>
          <ActionButtons
            confirm-button-title="Hochladen"
            cancel-button-title="Entfernen"
            @confirm="persistNewImage()"
            @cancel="removeImage()"
          />
        </div>
        <div class="d-flex flex-column px-4 py-10">
          <v-text-field
            class="w-100"
            label="Name"
            bg-color="#F6F4F1"
            :model-value="title"
          ></v-text-field>
          <v-text-field
            label="Typ"
            bg-color="#F6F4F1"
            :model-value="type"
          ></v-text-field>
          <v-text-field
            v-if="typeIsNotConsole()"
            label="Konsolen-Typ"
            bg-color="#F6F4F1"
            :model-value="consoleType"
          ></v-text-field>
          <v-textarea
            label="Beschreibung"
            bg-color="#F6F4F1"
            :model-value="description"
          ></v-textarea>
        </div>
      </div>
      <hr class="divider" />
      <ActionButtons
        confirm-button-title="Bestätigen"
        @confirm="persistEntity()"
        @cancel="closeEditEntityModal()"
      />
    </div>
  </v-card>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import ActionButtons from "@/ui/components/base/modal/ActionButtons.vue";
import { useEntityStore } from "@/data/store/entity/EntityStore";
import { storeToRefs } from "pinia";

const { selectedEntityForEdit } = storeToRefs(useEntityStore());
const imageSrc = ref("");
const title = ref(selectedEntityForEdit.value?.name);
const type = ref(selectedEntityForEdit.value?.type);
const consoleType = ref(selectedEntityForEdit.value?.consoleType || null);
const description = ref(selectedEntityForEdit.value?.description);

async function getImageForEntity() {
  if (selectedEntityForEdit.value?.id) {
    imageSrc.value = await useEntityStore().getImageForEntity(
      selectedEntityForEdit.value.id
    );
  }
}

function typeIsNotConsole() {
  return selectedEntityForEdit.value?.type === "console";
}

function removeImage() {}

function persistNewImage() {}

function persistEntity() {}

function closeEditEntityModal() {
  selectedEntityForEdit.value = null;
  useEntityStore().triggerEditEntityModuleActive();
}

onMounted(() => {
  getImageForEntity();
});
</script>
<style scoped>
.card::-webkit-scrollbar {
  display: none;
}
.card {
  background-color: #1e1c1b;
  z-index: 10;
  padding: 16px;
  display: flex;
  width: 100% !important;
}

.title {
  font-size: 32px !important;
  color: #f6f4f1;
  font-weight: 600;
  text-align: center;
}

.divider {
  margin: 16px;
  color: #f6f4f1;
}

.information-text {
  color: #c2b5ad;
  font-size: 16px;
}

.info-icon {
  margin-right: 16px;
  display: flex;
  align-self: center;
}
</style>
