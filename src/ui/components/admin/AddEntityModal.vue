<template>
  <AdminEntityModal
    title="Entität hinzufügen"
    confirm-button-title="Hinzufügen"
    @confirm="persistEntity()"
    @cancel="closeAddEntityModal()"
    v-model="selectedFile"
  >
    <div class="d-flex flex-column px-4 py-10">
      <v-autocomplete
        class="w-100"
        label="Typ"
        bg-color="#F6F4F1"
        :items="getAllEntityTypes()"
        v-model="type"
      ></v-autocomplete>
      <div v-if="type">
        <v-text-field
          class="w-100"
          label="Name"
          bg-color="#F6F4F1"
          v-model="name"
        ></v-text-field>
        <v-text-field
          v-if="!typeIsNotConsole()"
          label="Konsolen-Typ"
          bg-color="#F6F4F1"
          v-model="consoleType"
        ></v-text-field>
        <v-textarea
          label="Beschreibung"
          bg-color="#F6F4F1"
          v-model="description"
        ></v-textarea>
      </div>
    </div>
  </AdminEntityModal>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useEntityStore } from "@/data/store/entity/EntityStore";
import { storeToRefs } from "pinia";
import AdminEntityModal from "./AdminBaseModal.vue";

const { selectedEntityForEdit } = storeToRefs(useEntityStore());
const imageSrc = ref("");
const name = ref("");
const type = ref("");
const consoleType = ref("");
const description = ref("");
const selectedFile = ref<File | null>(null);

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

function getAllEntityTypes() {
  return ["game", "console", "accessory"];
}

async function persistEntity() {
  const id: number | null = await useEntityStore().persistEntity(
    name.value,
    description.value,
    type.value,
    consoleType.value
  );
  debugger
  if (selectedFile.value && id) {
    await useEntityStore().uploadImageForEntity(id);
  }
  closeAddEntityModal();
}

function closeAddEntityModal() {
  useEntityStore().triggerAddEntityModuleActive();
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
