<template>
  <AdminEntityModal
    :title="selectedShopForEdit?.name + ' bearbeiten'"
    confirm-button-title="Bestätigen"
    @confirm="persistShop()"
    @cancel="closeEdithShopModal()"
    v-model="selectedFile"
  >
    <div class="d-flex justify-end pb-2">
      <ActionButton
        v-if="selectedShopForEdit?.isArchived"
        button-text="Wiederherstellen"
        @action="unarchiveShop()"
      />
      <ActionButton v-else button-text="Archivieren" @action="archiveShop()" />
    </div>
    <OneLineInputField v-model="name" label-name="Name" />
    <OneLineInputField v-model="website" label-name="Webseite" />
    <OneLineInputField v-model="phoneNumber" label-name="Telefonnummer" />

    <div class="w-100 d-flex-column">
      <div class="d-flex flex-row">
        <OneLineInputField
          class="w-70 mr-2"
          v-model="streetName"
          label-name="Straßennamen"
        />
        <OneLineInputField v-model="streetNumber" label-name="Straßennummer" />
      </div>
      <div class="d-flex flex-row">
        <OneLineInputField
          class="w-70 mr-2"
          v-model="postalCode"
          label-name="Postleitzahl"
        />
        <OneLineInputField v-model="city" label-name="Stadt" />
      </div>
    </div>
  </AdminEntityModal>
</template>
<script lang="ts" setup>
import { useShopStore } from "@/data/store/ShopStore";
import AdminEntityModal from "../AdminBaseModal.vue";
import ActionButton from "../../ActionButton.vue";
import OneLineInputField from "../inputfields/OneLineInputField.vue";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const { selectedShopForEdit } = storeToRefs(useShopStore());

const selectedFile = ref<File | null>(null);
const name = ref<string | undefined>(selectedShopForEdit.value?.name);
const website = ref<string | undefined>(selectedShopForEdit.value?.website);
const phoneNumber = ref<string | undefined>(
  selectedShopForEdit.value?.phoneNumber
);
const streetName = ref<string | undefined>(
  selectedShopForEdit.value?.address.streetName
);
const streetNumber = ref<string | undefined>(
  selectedShopForEdit.value?.address.streetNumber
);
const postalCode = ref<number | undefined>(
  selectedShopForEdit.value?.address.postalCode
);
const city = ref<string | undefined>(selectedShopForEdit.value?.address.city);

async function persistShop() {}

function closeEdithShopModal() {
  useShopStore().triggerEditShopModuleActive();
  selectedShopForEdit.value = null;
}

function archiveShop() {}

function unarchiveShop() {}
</script>
