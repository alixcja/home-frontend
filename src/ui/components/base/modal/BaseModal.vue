<template>
  <v-card class="card">
    <p class="title">{{ props.title }}</p>
    <hr class="divider" />
    <EntitySection
      v-if="props.entities"
      v-for="entity in props.entities"
      :entity="entity"
    />
    <slot></slot>
    <hr class="divider" />
    <div v-if="props.infoText != null" class="d-flex flex-row ml-8 mb-6">
      <v-icon icon="mdi-information" class="info-icon" color="#c2b5ad"></v-icon>
      <p class="information-text">
        {{ props.infoText }}
      </p>
    </div>
    <ActionButtons
      :confirm-button-title="props.confirmButtonTitle"
      @confirm="$emit('confirm')"
      @cancel="$emit('cancel')"
    />
  </v-card>
</template>
<script lang="ts" setup>
import { defineProps, PropType } from "vue";
import ActionButtons from "./ActionButtons.vue";
import EntitySection from "../../booking/bookingmodule/EntitySection.vue";

const props = defineProps({
  title: String,
  confirmButtonTitle: String,
  infoText: String,
  entities: Array as PropType<BookingEntity[]>,
});
</script>
<style scoped>
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
  font-size: 40px !important;
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
</style>
