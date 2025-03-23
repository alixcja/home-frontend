<template>
  <v-card class="card elevation-24 rounded-xl pa-3">
    <div class="d-flex flex-row pb-3">
      <v-icon size="48px" :icon="news.icon"></v-icon>
      <p class="subtitle pl-2 align-self-center">{{ news.title }}</p>
    </div>
    <p class="texto">{{ news.description }}</p>
    <div
      v-if="news.actionButtonTitle"
      class="d-flex justify-end mb-1"
    >
      <ActionButton class="news-action-button-placement" :title="news.actionButtonTitle" @click="handleAction" />
    </div>
  </v-card>
</template>
<script lang="ts" setup>
import { NewsType } from "@/ts/newstypes.enums";
import { News } from "@/ts/types/news";
import ActionButton from "@/ui/components/base/ActionButton.vue";
import { useBookingStore } from "@/data/store/BookingStore";

const bookingStore = useBookingStore();
const props = defineProps(["news"]);
const news = News.getNewsCard(
  props.news?.type,
  props.news?.entity,
  props.news?.booking
);

function handleAction() {
  switch (props.news?.type) {
    case NewsType.NEWS_NEW_ENTITY:
      openBookingModal();
      break;
    case NewsType.NEWS_OVERDUE_BOOKINGS:
      openReturnModal();
      break;
    case NewsType.NEWS_SOON_OVERDUE_BOOKINGS:
      openReturnModal();
      break;
    default:
      console.warn("Unknown action");
  }
}

function openBookingModal() {
  /*   router.push("/booking");
   */ bookingStore.setEntitesForBooking([props.news?.entity]);
  bookingStore.triggerBookingModule();
}

function openReturnModal() {
  /*
   */ useBookingStore().setBookingToReturn(props.news?.booking);
  bookingStore.triggerReturnBookingModule();
  /*   router.push("/booking");
   */
}
</script>
<style scoped>
.card {
  width: 25vw;
  height: 22vh;
  margin-top: 16px;
  margin-bottom: 16px;
  margin-right: 24px;
  flex-direction: column;
}

.action-button {
  position: absolute;
  right: 16px;
  bottom: 16px;
  display: flex;
  justify-content: end;
  z-index: 20;
}

.button-width {
  width: 100% !important;
}

.news-action-button-placement {
  position: absolute;
  bottom: 16px;
  right: 16px;
}
</style>
