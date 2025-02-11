<template>
  <div class="d-flex flex-row justify-start">
    <div class="mx-8 my-4">
      <v-img
        width="175px"
        height="175px"
        src="https://www.movasis.com/wp-content/uploads/2017/01/image-placeholder-500x500.jpg"
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
const props = defineProps(["entity", "isToggled"]);

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
