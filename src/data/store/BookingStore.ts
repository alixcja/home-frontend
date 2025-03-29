import { defineStore } from "pinia";
import axiosInstance from "../api/axios";

export const useBookingStore = defineStore("booking", {
  state: () => ({
    isBookingModuleActive: false,
    isReturnBookingModuleActive: false,
    isCancelBookingModalActive: false,
    selectedEntitiesForBooking: [] as BookingEntity[],
    currentBookings: [] as Booking[],
    overdueBookings: [] as Booking[],
    hasCurrentOrFutureBookings: false,
    hasBookingsOverdue: false,
    bookingToReturn: {} as Booking | null,
    bookingToCancel: {} as Booking | null,
  }),
  getters: {},
  actions: {
    triggerBookingModule() {
      this.isBookingModuleActive = !this.isBookingModuleActive;
    },
    triggerCancelBookingModal() {
      this.isCancelBookingModalActive = !this.isCancelBookingModalActive;
    },
    triggerReturnBookingModule() {
      this.isReturnBookingModuleActive = !this.isReturnBookingModuleActive;
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

    setBookingToReturn(booking: Booking) {
      this.bookingToReturn = booking;
    },
    
    setBookingToCancel(booking: Booking) {
      console.log(booking)
      this.bookingToCancel = booking;
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
      let bookings:  Partial<Booking>[] = [];
      selectedEntitiesForBooking.forEach((bookingEntity) => {
        const booking: Partial<Booking> = {
          userId: "test-person",
          bookingEntity,
          startDate,
          endDate,
        };
        bookings.push(booking);
      });
      return bookings;
    },

    returnBooking() {
      if (this.bookingToReturn) {
        axiosInstance
        .put(`${import.meta.env.VITE_BACKEND_URL}/bookings/return/${this.bookingToReturn.id}`);
      }
    },

    cancelBooking() {
      axiosInstance
        .put(`${import.meta.env.VITE_BACKEND_URL}/bookings/cancel/${this.bookingToCancel.id}`);
    }
  },
});
