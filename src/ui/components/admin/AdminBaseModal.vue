<template>
  <v-card class="card">
    <div class="d-flex flex-column">
      <p class="title">{{ props.title }}</p>
      <hr class="divider" />
      <div class="d-flex flex-row mx-4">
        <div class="d-flex flex-column image-preview">
          <v-img class="mb-3" aspect-ratio="1" :src="imageSrc"></v-img>
          <input
            type="file"
            ref="fileInput"
            style="display: none"
            @change="handleFileSelect"
            accept="image/*"
          />
          <ActionButtons
            confirm-button-title="Auswählen"
            cancel-button-title="Entfernen"
            @confirm="openFileExplorer()"
            @cancel="removeImage()"
            width="100%"
            class="admin-action-buttons"
          />
        </div>
        <div class="d-flex flex-column px-4 py-10">
          <slot></slot>
        </div>
      </div>
      <hr class="divider" />
      <ActionButtons
        :confirm-button-title="props.confirmButtonTitle"
        @confirm="$emit('confirm')"
        @cancel="$emit('cancel')"
        class="mx-4"
      />
    </div>
  </v-card>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import ActionButtons from "@/ui/components/base/modal/ActionButtons.vue";
import { useEntityStore } from "@/data/store/entity/EntityStore";
import { storeToRefs } from "pinia";

const props = defineProps({
  title: String,
  confirmButtonTitle: String,
});

const { selectedEntityForEdit } = storeToRefs(useEntityStore());
const imageSrc = ref("");
const fileInput = ref<HTMLInputElement | null>(null);
const modelValue = defineModel<File | null>();

async function getImageForEntity() {
  if (selectedEntityForEdit.value?.id) {
    imageSrc.value = await useEntityStore().getImageForEntity(
      selectedEntityForEdit.value.id
    );
  } else {
    imageSrc.value = await useEntityStore().getDefaultImage();
  }
}

async function removeImage() {
  modelValue.value = null;
  imageSrc.value = await useEntityStore().getDefaultImage();
}

const openFileExplorer = () => {
  fileInput.value?.click();
};

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file) {
    modelValue.value = file;
    imageSrc.value = URL.createObjectURL(file);
  }
};
onMounted(() => {
  getImageForEntity();
});
</script>
<style scoped>
.image-preview {
  width: 40% !important;
}
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

.admin-action-buttons {
  width: 100%;
}
</style>
