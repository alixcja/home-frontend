<template>
  <AdminEntityModal
    title="Entität hinzufügen"
    confirm-button-title="Hinzufügen"
    @confirm="persistEntity()"
    @cancel="closeAddEntityModal()"
    v-model="selectedFile"
  >
    <div class="d-flex flex-column">
      <TypeInputField
        :all-types="getAllEntityTypes()"
        v-model="typeString"
      ></TypeInputField>
      <div v-show="type">
        <NameInputField v-model="name" />
        <ConsoleTypeInputField
          v-if="typeIsNotConsole()"
          v-model="consoleType"
        />
        <DescriptionInputField v-model="description" />
      </div>
    </div>
  </AdminEntityModal>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { useEntityStore } from "@/data/store/entity/EntityStore";
import { storeToRefs } from "pinia";
import { BookingEntityType } from "@/ts/entitytypes.enums";
import AdminEntityModal from "../modals/AdminBaseModal.vue";
import NameInputField from "./inputfields/NameInputField.vue";
import ConsoleTypeInputField from "./inputfields/ConsoleTypeInputField.vue";
import TypeInputField from "./inputfields/TypeInputField.vue";
import DescriptionInputField from "./inputfields/DescriptionInputField.vue";

const { selectedEntityForEdit } = storeToRefs(useEntityStore());
const imageSrc = ref<string | undefined>(undefined);
const name = ref<string | undefined>(undefined);
const type = ref<BookingEntityType | undefined>(undefined);
const consoleType = ref<string | undefined>(undefined);
const description = ref<string | undefined>(undefined);
const selectedFile = ref<File | null>(null);

const typeString = computed({
  get: () => (type.value ? type.value.toString() : undefined),
  set: (val: string | undefined) => {
    type.value = val as unknown as BookingEntityType;
  },
});

async function getImageForEntity() {
  if (selectedEntityForEdit.value?.id) {
    imageSrc.value = await useEntityStore().getImageForEntity(
      selectedEntityForEdit.value.id
    );
  }
}

function typeIsNotConsole() {
  return type.value !== BookingEntityType.Console;
}

function getAllEntityTypes() {
  return Object.values(BookingEntityType);
}

async function persistEntity() {
  const id: number | null = await useEntityStore().persistEntity(
    name.value!,
    type.value!,
    consoleType.value,
    description.value
  );
  if (selectedFile.value && id) {
    await useEntityStore().uploadImageForEntity(id, selectedFile.value);
  }
  closeAddEntityModal();
  useEntityStore().getAllEntites();
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
@/ts/entity.types