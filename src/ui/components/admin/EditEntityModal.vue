<template>
  <AdminEntityModal
    :title="selectedEntityForEdit?.name + ' bearbeiten'"
    confirm-button-title="Bestätigen"
    @confirm="persistEntity()"
    @cancel="closeEditEntityModal()"
    v-model="selectedFile"
  >
    <v-text-field
      class="w-100"
      label="Name"
      bg-color="#F6F4F1"
      :model-value="title"
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
  </AdminEntityModal>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useEntityStore } from "@/data/store/entity/EntityStore";
import { storeToRefs } from "pinia";
import AdminEntityModal from "./AdminBaseModal.vue";

const { selectedEntityForEdit } = storeToRefs(useEntityStore());
const title = ref(selectedEntityForEdit.value?.name);
const type = ref(selectedEntityForEdit.value!.type);
const consoleType = ref(selectedEntityForEdit.value!.consoleType || null);
const description = ref(selectedEntityForEdit.value!.description);
const selectedFile = ref<File | null>(null);

function typeIsNotConsole() {
  return selectedEntityForEdit.value?.type === "console";
}

// TODO: Find a better solution
async function persistEntity() {
  useEntityStore().updateEntity(
    selectedEntityForEdit.value?.id as number,
    title.value as string,
    type.value as string,
    description.value as string,
    consoleType.value as string
  );
  if (selectedFile.value && selectedEntityForEdit.value?.id) {
    await useEntityStore().uploadImageForEntity(selectedEntityForEdit.value.id, selectedFile.value);
  }
  closeEditEntityModal();
}

function closeEditEntityModal() {
  selectedEntityForEdit.value = null;
  useEntityStore().triggerEditEntityModuleActive();
}
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
