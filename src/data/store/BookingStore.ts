import { defineStore } from "pinia";
import { Entity } from "../../ts/types/entity.types";
import { Booking } from "../../ts/types/booking.types";
import axios from "axios";

export const useBookingStore = defineStore("booking", {
  state: () => ({
    isBookingModuleActive: false,
    selectedEntitiesForBooking: [] as Entity[],
  }),
  getters: {},
  actions: {
    triggerBookingModule() {
      this.isBookingModuleActive = !this.isBookingModuleActive;
    },
    setEntitesForBooking(entities: Entity[]) {
      this.selectedEntitiesForBooking = entities;
    },
    createBookings() {},
    persistBooking(bookings: Booking[]) {
      if (bookings) {
        axios.post("http://localhost:8000/bookings/new", bookings).then(() => {
          return true;
        });
      }
    },
  },
});
