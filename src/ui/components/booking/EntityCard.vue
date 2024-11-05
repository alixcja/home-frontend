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
        src="https://www.movasis.com/wp-content/uploads/2017/01/image-placeholder-500x500.jpg"
      ></v-img>
      <div class="px-2 py-2">
        <b class="selected">{{ props.entity.name }}</b>
        <p v-if="props.entity.consoleType">{{ props.entity.consoleType }}</p>
        <p
          v-if="
            props.entity.description && (props.entity.type === 'game') == false
          "
        >
          {{ props.entity.description }}
        </p>
      </div>
    </v-card>
  </div>
</template>
<script setup lang="ts">
const props = defineProps(["entity", "selectedEntities"]);
import { computed } from "vue";
import { Entity } from "../../../ts/types/entity.types";

const isSelected = computed(() =>
  props.selectedEntities.some((entity: Entity) => entity.id === props.entity.id)
);
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
