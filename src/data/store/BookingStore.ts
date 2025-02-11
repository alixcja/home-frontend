import { defineStore } from "pinia";
import axiosInstance from "../api/axios";

export const useBookingStore = defineStore("booking", {
  state: () => ({
    isBookingModuleActive: false,
    selectedEntitiesForBooking: [] as BookingEntity[],
    currentBookings: [] as Booking[],
    overdueBookings: [] as Booking[],
    hasCurrentOrFutureBookings: false,
    hasBookingsOverdue: false,
  }),
  getters: {},
  actions: {
    triggerBookingModule() {
      this.isBookingModuleActive = !this.isBookingModuleActive;
    },
    setEntitesForBooking(entities: BookingEntity[]) {
      this.selectedEntitiesForBooking = entities;
    },

    setCurrentBookings(bookings: Booking[]) {
      this.currentBookings = bookings;
    },

    setOverdueBookings(bookings: Booking[]) {
      this.overdueBookings = bookings;
    },

    fetchAllBookings() {
      this.fetchAllCurrentBookings();
      this.fetchAllOverdueBookings();
    },

    fetchAllCurrentBookings() {
      axiosInstance
        .get(`${import.meta.env.VITE_BACKEND_URL}/bookings?status=upcoming`)
        .then((response) => {
          if (response.data.length > 0) {
            this.setCurrentBookings(response.data);
            this.hasCurrentOrFutureBookings = true;
          }
        });
    },

    fetchAllOverdueBookings() {
      axiosInstance
        .get(`${import.meta.env.VITE_BACKEND_URL}/bookings?status=overdue`)
        .then((response) => {
          if (response.data.length > 0) {
            this.setOverdueBookings(response.data);
            this.hasBookingsOverdue = true;
          }
        });
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

      if (bookings) {
        axiosInstance
          .post(`${import.meta.env.VITE_BACKEND_URL}/bookings`, bookings)
          .then(() => {
            this.triggerBookingModule();
          });
      }
    },

    createBookings(
      selectedEntitiesForBooking: BookingEntity[],
      startDate: Date,
      endDate: Date
    ) {
      let bookings: Booking[] = [];
      selectedEntitiesForBooking.forEach((bookingEntity) => {
        const booking: Booking = {
          userId: "test-person",
          bookingEntity,
          startDate,
          endDate,
        };
        bookings.push(booking);
      });
      return bookings;
    },
  },
});
