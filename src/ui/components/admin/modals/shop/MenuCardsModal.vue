<template>
  <v-card class="card">
    <div class="d-flex flex-column">
      <p class="title">Menükarten für {{ props.entity.name }}</p>
      <hr class="divider" />
      <div class="d-flex flex-row mx-4 overflow-auto">
        <draggable
          v-model="selectedNewMenuCards"
          item-key="id"
          class="d-flex flex-row"
          :animation="200"
          tag="div"
        >
          <template #item="{ element, index }">
            <div class="card-wrapper">
              <v-btn
                icon
                size="x-small"
                color="red"
                class="remove-image-button d-flex"
                @click.stop="removeImage(index)"
              >
                <v-icon size="14">mdi-close</v-icon>
              </v-btn>
              <v-card
                width="120"
                :flat="true"
                class="text-center ma-2"
                color="#1e1c1b"
                style="cursor: grab"
              >
                <v-img
                  :src="imageUrls[element.id]"
                  height="120"
                  cover
                ></v-img>
                <p>Seite {{ index + 1 }}</p>
              </v-card>
            </div>
          </template>
        </draggable>
        <div class="d-flex flex-row w-100">
          <input
            type="file"
            ref="fileInput"
            style="display: none"
            @change="handleFileSelect"
            accept="image/*"
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
import draggable from "vuedraggable";

const props = defineProps(["entity"]);

const { selectedShopForMenuCardsEditing } = storeToRefs(useShopStore());
const selectedNewMenuCards = ref<(string | null)[]>([]);
const fileInput = ref<HTMLInputElement | null>(null);
const imageUrls = ref<(string | null)[]>([]);

onMounted(() => {
  getMenucardsForShops();
});

async function getMenucardsForShops() {
  if (
    selectedShopForMenuCardsEditing.value?.id &&
    selectedShopForMenuCardsEditing.value.menuCardCount > 0
  ) {
    for (
      let i = 1;
      i <= selectedShopForMenuCardsEditing.value.menuCardCount;
      i++
    ) {
      const image = await useShopStore().getMenuCardByShopAndNumber(
        selectedShopForMenuCardsEditing.value.id,
        i
      );
      selectedNewMenuCards.value.push(image);
    }
  }
  debugger
  loadImageUrls();
}

async function removeImage(index: number) {
  selectedNewMenuCards.value.splice(index, 1);
}

async function fetchImageAsBlob(url: string) {
  const response = await fetch(url);
  const blob = await response.blob();
  return URL.createObjectURL(blob);
}

async function loadImageUrls() {
  debugger
  for (const card of selectedNewMenuCards.value) {
    if (card?.id != null && !imageUrls.value[card.id]) {
      imageUrls[card.id].value = await fetchImageAsBlob(card.imageUrl);
    }
  }
}

const openFileExplorer = () => {
  fileInput.value?.click();
};

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file) {
    selectedNewMenuCards.value.push(URL.createObjectURL(file));
  }
  target.value = "";
};

function persistMenuCards() {
  selectedNewMenuCards.value.forEach((menuCard) => {
    const number = selectedNewMenuCards.value.indexOf(menuCard) + 1;
    useShopStore().persistMenuCardForShop(number, menuCard);
  });
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
  z-index: 30;
  right: -5px;
  top: -2px;
  background-color: white;
}
</style>
