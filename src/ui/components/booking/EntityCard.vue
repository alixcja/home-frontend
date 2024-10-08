<template>
  <div class="mr-4">
    <div class="icon-position">
      <div class="circle right d-flex justify-center align-center">
        <v-icon color="white"> mdi-check </v-icon>
      </div>
    </div>
    <v-card  @click="$emit('handleSelection')" class="elevation-24 rounded-xl card">
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
const props = defineProps(["entity"]);

</script>
<style>
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
  display: flex;
  justify-content: end;
  position: relative;
  top: 20px;
  left: 15px;
  z-index: 10;
}
.card {
  width: 10vw;
  height: 32vh;
}
</style>
