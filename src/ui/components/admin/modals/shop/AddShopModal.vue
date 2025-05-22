<template>
  <AdminEntityModal
    title="Shop hinzufügen"
    confirm-button-title="Hinzufügen"
    @confirm="persistShop()"
    @cancel="closeAddShopModal()"
    v-model="selectedFile"
  >
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
import { ref } from "vue";
import AdminEntityModal from "../AdminBaseModal.vue";
import OneLineInputField from "../inputfields/OneLineInputField.vue";
import { useShopStore } from "@/data/store/ShopStore";

const selectedFile = ref<File | null>(null);
const name = ref<string | undefined>(undefined);
const website = ref<string | undefined>(undefined);
const phoneNumber = ref<string | undefined>(undefined);
const streetName = ref<string | undefined>(undefined);
const streetNumber = ref<string | undefined>(undefined);
const postalCode = ref<number | undefined>(undefined);
const city = ref<string | undefined>(undefined);

async function persistShop() {
  const id: number | null = await useShopStore().persistShop(
    name.value!,
    website.value,
    phoneNumber.value,
    streetName.value,
    streetNumber.value,
    postalCode.value,
    city.value
  );
  if (selectedFile.value && id) {
    await useShopStore().uploadImageForShop(id, selectedFile.value);
  }
  closeAddShopModal();
  useShopStore().getAllShops();
}

function closeAddShopModal() {
  useShopStore().triggerAddShopModuleActive();
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
