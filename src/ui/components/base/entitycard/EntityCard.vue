<template>
  <div class="card-position">
    <div class="icon-position" v-if="isSelected">
      <div class="circle right d-flex justify-center align-center">
        <v-icon color="white"> mdi-check </v-icon>
      </div>
    </div>
    <v-card
      @click="$emit('handleSelection')"
      :class="{ selected: isSelected }"
      class="elevation-24 rounded-xl card"
    >
      <v-img
        width="100%"
        :src="imageSrc"
        :cover="true"
        aspect-ratio="1"
      ></v-img>
      <BookingEntityContent
        v-if="entityIsABookingEntity"
        :entity="props.entity"
      />
      <ShopContent v-else :entity="props.entity"></ShopContent>
    </v-card>
  </div>
</template>
<script setup lang="ts">
const props = defineProps(["entity", "selectedEntities"]);
import { useEntityStore } from "@/data/store/entity/EntityStore";
import BookingEntityContent from "./BookingEntityContent.vue";
import ShopContent from "./ShopContent.vue";
import { computed, onMounted, ref } from "vue";

const imageSrc = ref("");

onMounted(getImageForEntity);

async function getImageForEntity() {
  imageSrc.value = await useEntityStore().getImageForEntity(props.entity?.id);
}
const isSelected = computed(() => {
  if (!!props.selectedEntities) {
    props.selectedEntities.some(
      (entity: BookingEntity) => entity.id === props.entity.id
    );
  }
});

const entityIsABookingEntity = computed(() => !!props.entity?.type);
</script>
<style>
.card-position {
  margin-right: 40px;
  height: 15%;
  position: sticky;
}
.selected {
  border-width: 0.25vw !important;
  border-color: #ff8200 !important;
}
.circle {
  width: 35px;
  height: 35px;
  border-radius: 100%;
  background-color: #ff8200;
}
.icon-position {
  justify-content: end;
  position: absolute;
  top: -12px;
  right: -12px;
  z-index: 10;
}
.card {
  width: 10vw;
  height: 32vh;
  position: relative;
}
</style>
