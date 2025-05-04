<template>
  <v-card class="card">
    <div class="d-flex flex-column">
      <p class="title">Menükarten für {{ props.entity.name }}</p>
      <hr class="divider" />
      <div class="d-flex flex-row mx-4">
        <!-- <div class="d-flex flex-row w-100">
           <v-img class="mb-3" aspect-ratio="1" :src="imageSrc"></v-img>
          <input
            type="file"
            ref="fileInput"
            style="display: none"
            @change="handleFileSelect"
            accept="image/*"
          />

          <div class="d-flex fill-width flex-column align-center">
            <v-card class="add-new-menucard" @click="openFileExplorer()">
              <v-icon color="white">mdi-plus</v-icon>
            </v-card>
          </div>
        </div> -->
      </div>
      <hr class="divider" />
      <ActionButtons
        confirm-button-title="Speichern"
        @confirm="persistMenuCards"
        @cancel="cancel"
        class="mx-4"
      />
    </div>
  </v-card>
</template>
<script lang="ts" setup>
import { useEntityStore } from "@/data/store/entity/EntityStore";
import { useShopStore } from "@/data/store/ShopStore";
import ActionButtons from "@/ui/components/base/modal/ActionButtons.vue";
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";

const props = defineProps(["entity"]);

const { selectedShopForMenuCardsEditing } = storeToRefs(useShopStore());
const selectedNewMenuCards = ref<(string | null)[]>([]);
const allMenuCards = ref();
const fileInput = ref<HTMLInputElement | null>(null);
const modelValue = defineModel<File | null>();

onMounted(() => {
  getMenucardsForShops();
});

async function getMenucardsForShops() {
  if (selectedShopForMenuCardsEditing.value?.id) {
    allMenuCards.value = await useShopStore().getMenuCardsForShop(
      selectedShopForMenuCardsEditing.value.id
    );
  } else {
    allMenuCards.value = await useEntityStore().getDefaultImage();
  }
}

async function removeImage() {
  modelValue.value = null;
  selectedNewMenuCards.value = [];
}

const openFileExplorer = () => {
  fileInput.value?.click();
};

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file) {
    modelValue.value = file;
    selectedNewMenuCards.value.push(URL.createObjectURL(file));
  }
};

function persistMenuCards() {}

function cancel() {
  useShopStore().triggerEditMenuCardsForShopModuleActive();
}
</script>
<style lang="scss" scoped>
/* .image-preview {
  width: 40% !important;
  align-self: start;
} */
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

  .admin-action-buttons {
    width: 100%;
  }
}

.add-new-menucard {
  width: 15vw !important;
  height: 15vh !important;
  background-color: #5b5552 !important;
  justify-content: center;
  align-items: center;
  display: flex;
}
</style>
