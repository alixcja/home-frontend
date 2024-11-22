<template>
  <div class="d-flex flex-row justify-start">
    <div class="ma-8">
      <v-img
        width="200px"
        height="200px"
        src="https://www.movasis.com/wp-content/uploads/2017/01/image-placeholder-500x500.jpg"
      ></v-img>
    </div>
    <div class="d-flex flex-column ml-4 justify-center">
      <p class="entity-title">{{ props.entity.name }}</p>
      <div class="d-flex flex-row">
        <p class="entity-text">{{ getType(props.entity.type) }}</p>
        <p class="entity-text" v-if="props.entity.consoleType">
          - {{ entity.consoleType }}
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps(["entity", "isToggled"]);

function getType(type: string) {
  switch (type) {
    case "game":
      return "Spiel ";
    case "console":
      return "Konsole ";
    case "accessory":
      return "Konsolebn-Zubehör ";
  }
}
</script>
<style scoped>
.entity-title {
  color: #f6f4f1;
  font-size: 32px;
  font-weight: 600;
}

.entity-text {
  color: #c2b5ad;
  font-size: 24px;
}
</style>
