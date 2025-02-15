<template>
  <v-card class="card elevation-24 rounded-xl">
    <div class="d-flex flex-row">
      <v-img height="100%" width="40%" :src="imageSrc"></v-img>
      <div class="d-flex flex-column">
        <div class="ma-4">
          <h3>{{ props.booking.bookingEntity.name }}</h3>
          <p class="mt-2">
            {{ description() }}
          </p>
        </div>
        <div width="100%" class="mt-2 action-button">
          <v-btn
            v-if="isActive()"
            @click="openReturnModal"
            class="primary-button button-width"
            >Abgabe</v-btn
          >
          <v-btn
            v-else
            @click="openReturnModal"
            class="primary-button button-width"
            >Stornieren</v-btn
          >
        </div>
      </div>
    </div>
  </v-card>
</template>
<script lang="ts" setup>
import { useBookingStore } from "@/data/store/BookingStore";
import { useEntityStore } from "@/data/store/entity/EntityStore";
import moment from "moment";
import { ref, onMounted } from "vue";

const props = defineProps(["booking", "overdue"]);
const bookingStore = useBookingStore();

const imageSrc = ref("");

onMounted(getImageForEntity);

async function getImageForEntity() {
  imageSrc.value = await useEntityStore().getImageForEntity(
    props.booking?.bookingEntity?.id
  );
}

function isActive() {
  return new Date(props.booking.startDate) <= new Date();
}

function formatDate(date: Date) {
  return moment(String(date)).format("DD.MM.YYYY");
}

function openReturnModal() {
  console.log(props.booking);
  useBookingStore().setBookingToReturn(props.booking);
  bookingStore.triggerReturnBookingModule();
}

function description() {
  const type = getEntityType();
  const formattedStartDate = formatDate(props.booking?.startDate);
  const formattedEndDate = formatDate(props.booking?.endDate);
  const formattedType = type.charAt(0).toUpperCase() + type.slice(1);

  if (props.overdue == false) {
    const descriptions = [
      `Für kurze Zeit nur deins: Genieße ${type} vom ${formattedStartDate} bis ${formattedEndDate}!`,
      `Vom ${formattedStartDate} bis ${formattedEndDate} ist ${type} ganz allein deins!`,
      `${formattedType} gehört vom ${formattedStartDate} bis ${formattedEndDate} nur dir!`,
    ];
    return descriptions[Math.floor(Math.random() * descriptions.length)];
  } else {
    const descriptions = [
      `Dieses Buchung ist seit dem ${formattedEndDate} abgelaufen. Bitte bringe ${type} zurück und bestätige deine Rückgabe.`,
      `Die Frist für diese Buchung ist am ${formattedEndDate} vorbei. Bitte bringe ${type} zurück und bestätige die Rückgabe.`,
      `Die Buchung lief bis zum ${formattedEndDate}. Bitte gib ${type} zurück und bestätige die Rückgabe.`,
    ];
    return descriptions[Math.floor(Math.random() * descriptions.length)];
  }
}

function getEntityType(): string {
  switch (props.booking?.bookingEntity?.type) {
    case "game":
      return "das Spiel ";
    case "console":
      return "die Konsole ";
    case "accessory":
      return "das Konsolen-Zubehör";
    default:
      return "";
  }
}
</script>
<style scoped>
.card {
  width: 27vw;
  height: 22vh;
  margin-top: 16px;
  margin-bottom: 16px;
  margin-right: 24px;
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
</style>
