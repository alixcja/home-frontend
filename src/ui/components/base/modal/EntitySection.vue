<template>
  <div class="d-flex flex-row justify-start">
    <div class="mx-8 my-4">
      <v-img
        width="175px"
        height="175px"
        :src="imageSrc"
        :cover="true"
        aspect-ratio="1"
      ></v-img>
    </div>
    <div class="d-flex flex-column ml-4 justify-center">
      <p class="entity-title">{{ props.entity.name }}</p>
      <div class="d-flex flex-row">
        <p class="entity-text">
          {{ getType(props.entity.type) }}
          <span v-if="props.entity.consoleType">
            - {{ props.entity.consoleType }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useEntityStore } from "@/data/store/entity/EntityStore";

const props = defineProps(["entity", "isToggled"]);
const imageSrc = ref("");

onMounted(getImageForEntity);

async function getImageForEntity() {
  imageSrc.value = await useEntityStore().getImageForEntity(props.entity?.id);
}

function getType(type: string) {
  switch (type) {
    case "game":
      return "Spiel ";
    case "console":
      return "Konsole ";
    case "accessory":
      return "Konsolen-Zubehör ";
  }
}
</script>
<style scoped>
.entity-title {
  color: #f6f4f1;
  font-size: 28px;
  font-weight: 600;
}

.entity-text {
  color: #c2b5ad;
  font-size: 24px;
}
</style>
