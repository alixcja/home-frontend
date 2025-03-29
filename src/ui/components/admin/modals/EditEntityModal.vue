<template>
  <AdminEntityModal
    :title="selectedEntityForEdit?.name + ' bearbeiten'"
    confirm-button-title="Bestätigen"
    @confirm="persistEntity()"
    @cancel="closeEditEntityModal()"
    v-model="selectedFile"
  >
    <div class="d-flex justify-end pb-2">
      <ActionButton
        v-if="selectedEntityForEdit?.isArchived"
        button-text="Wiederherstellen"
        @action="unarchiveEntity()"
      />
      <ActionButton
        v-else
        button-text="Archivieren"
        @action="archiveEntity()"
      />
    </div>
    <NameInputField v-model="name" />
    <ConsoleTypeInputField v-if="typeIsNotConsole()" v-model="consoleType" />
    <DescriptionInputField v-model="description" />
  </AdminEntityModal>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useEntityStore } from "@/data/store/entity/EntityStore";
import { storeToRefs } from "pinia";
import AdminEntityModal from "./AdminBaseModal.vue";
import NameInputField from "./inputfields/NameInputField.vue";
import ConsoleTypeInputField from "./inputfields/ConsoleTypeInputField.vue";
import DescriptionInputField from "./inputfields/DescriptionInputField.vue";
import ActionButton from "../ActionButton.vue";

const { selectedEntityForEdit } = storeToRefs(useEntityStore());
const name = ref<string | undefined>(selectedEntityForEdit.value?.name);
const type = ref(selectedEntityForEdit.value!.type);
const consoleType = ref<string | undefined>(
  selectedEntityForEdit.value!.consoleType || undefined
);
const description = ref<string | undefined>(
  selectedEntityForEdit.value!.description
);
const selectedFile = ref<File | null>(null);

function typeIsNotConsole() {
  return selectedEntityForEdit.value?.type !== "console";
}

function archiveEntity() {
  useEntityStore().archiveEntity(selectedEntityForEdit?.value?.id!);
  useEntityStore().getAllEntites();
}

function unarchiveEntity() {
  useEntityStore().unarchiveEntity(selectedEntityForEdit?.value?.id!);
  useEntityStore().getAllEntites();
}

// TODO: Find a better solution
async function persistEntity() {
  useEntityStore().updateEntity(
    selectedEntityForEdit.value?.id as number,
    name.value as string,
    type.value,
    description.value as string,
    consoleType.value as string
  );
  if (selectedFile.value && selectedEntityForEdit.value?.id) {
    await useEntityStore().uploadImageForEntity(
      selectedEntityForEdit.value.id,
      selectedFile.value
    );
  }
  closeEditEntityModal();
  useEntityStore().getAllEntites();
}

function closeEditEntityModal() {
  useEntityStore().triggerEditEntityModuleActive();
  selectedEntityForEdit.value = null;
  useEntityStore().getAllEntites();

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
