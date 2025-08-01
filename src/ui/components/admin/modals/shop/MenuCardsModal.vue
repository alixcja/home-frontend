<template>
  <v-card class="card">
    <div class="d-flex flex-column">
      <p class="title">Menükarten für {{ props.entity.name }}</p>
      <hr class="divider" />

      <div class="d-flex flex-row mx-4 overflow-auto">
        <div class="d-flex flex-row gap-4 flex-wrap">
          <draggable v-model="menuCards" item-key="number">
            <template #item="{ element, index }">
              <div class="drag-card" style="position: relative; cursor: move">
                <v-img
                  :width="300"
                  :height="300"
                  class="mb-3"
                  aspect-ratio="1"
                  :src="element.imageSrc"
                />
                <v-btn
                  icon
                  class="remove-image-button"
                  @click="removeImage(index)"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </div>
            </template>
          </draggable>
          <div class="d-flex flex-row w-100">
            <input
              type="file"
              ref="fileInput"
              style="display: none"
              multiple
              accept="image/*"
              @change="handleFileSelect"
            />
            <div class="d-flex fill-width flex-column align-center">
              <v-card
                class="add-new-menucard ma-2"
                @click="openFileExplorer()"
                width="120"
                height="120"
              >
                <v-icon color="white">mdi-plus</v-icon>
              </v-card>
            </div>
          </div>
        </div>
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
import { useShopStore } from "@/data/store/ShopStore";
import ActionButtons from "@/ui/components/base/modal/ActionButtons.vue";
import { storeToRefs } from "pinia";
import { ref, onMounted, watchEffect } from "vue";
import draggable from "vuedraggable";
const { selectedShopForMenuCardsEditing } = storeToRefs(useShopStore());

const fileInput = ref<HTMLInputElement | null>(null);
const menuCards = ref<MenuCard[]>([]);
const props = defineProps(["entity"]);

onMounted(() => {
  loadExistingMenuCards();
});

async function loadExistingMenuCards() {
  const shop = selectedShopForMenuCardsEditing.value;
  if (!shop) return;

  menuCards.value = [];

  for (let i = 1; i <= shop.menuCardCount; i++) {
    const blobUrl = await useShopStore().getMenuCardByShopAndNumber(shop.id, i);
    menuCards.value.push(blobUrl);
  }
}

function openFileExplorer() {
  fileInput.value?.click();
}

function handleFileSelect(event: Event) {
  const target = event.target as HTMLInputElement;
  const files = target.files;

  if (files) {
    for (const file of Array.from(files)) {
      const imageSrc = URL.createObjectURL(file);

      const newMenuCard: MenuCard = {
        number: menuCards.value.length + 1,
        file,
        imageSrc,
      };
      menuCards.value.push(newMenuCard);
    }
  }
  target.value = "";
}

async function persistMenuCards() {
  await useShopStore().deleteAllMenuCardsForShop();
  const shop = selectedShopForMenuCardsEditing.value;
  if (!shop) return;
  let imageNumber = 1;

  for (let i = 1; i <= menuCards.value.length; i++) {
    const current = menuCards.value[i - 1];
    await useShopStore().persistMenuCardForShop(i, current.file);
  }

  await loadExistingMenuCards();
}

function removeImage(index: number) {
  menuCards.value.splice(index, 1);
}

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
  background-color: #5b5552 !important;
  justify-content: center;
  align-items: center;
  display: flex;
}

.icon-position {
  justify-content: end;
  position: absolute;
  top: -12px;
  right: -12px;
  z-index: 10;
}

.card-wrapper {
  position: relative;
  display: inline-block;
}

.remove-image-button {
  position: absolute;
  top: 8px;
  right: -25px;
  z-index: 30;
  background-color: white;
}

.image-preview {
  width: 40% !important;
  align-self: start;
}
</style>
