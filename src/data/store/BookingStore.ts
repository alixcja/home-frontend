import { defineStore } from "pinia";
import axios from "axios";

export const useBookingStore = defineStore("booking", {
  state: () => ({
    isBookingModuleActive: false,
    selectedEntitiesForBooking: [] as BookingEntity[],
  }),
  getters: {},
  actions: {
    triggerBookingModule() {
      this.isBookingModuleActive = !this.isBookingModuleActive;
    },
    setEntitesForBooking(entities: BookingEntity[]) {
      this.selectedEntitiesForBooking = entities;
    },

    persistBooking(
      selectedEntitiesForBooking: BookingEntity[],
      startDate: Date,
      endDate: Date
    ) {
      const bookings = this.createBookings(
        selectedEntitiesForBooking,
        startDate,
        endDate
      );

      console.log(bookings)

      if (bookings) {
        axios.post("http://localhost:8000/bookings/new", bookings).then(() => {
          return true;
        });
      }
    },
    
    createBookings(
      selectedEntitiesForBooking: BookingEntity[],
      startDate: Date,
      endDate: Date
    ) {
      let bookings: Booking[] = [];
      selectedEntitiesForBooking.forEach((bookedBookingEntity) => {
        const  booking: Booking = {
          userId: "test-person",
          bookedBookingEntity,
          startDate,
          endDate,
        }
        bookings.push(booking);
      });
      return bookings;
    },
  },
});
