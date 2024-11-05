import { defineStore } from "pinia";
import { Entity } from "../../ts/types/entity.types";

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
    }
  },
});