import { defineStore } from "pinia";
import axiosInstance from "../api/axios";
import { useToast } from "vue-toastification";
import { AxiosError } from "axios";

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
      this.bookingToCancel = booking;
    },

    async fetchAllBookings() {
      this.fetchAllCurrentBookings();
      this.fetchAllOverdueBookings();
    },

    async fetchAllCurrentBookings() {
      axiosInstance
        .get(`${import.meta.env.VITE_BACKEND_URL}/bookings?status=upcoming`)
        .then((response) => {
            const bookings = Array.isArray(response.data) ? response.data : [];
            this.setCurrentBookings(bookings);
            this.hasCurrentOrFutureBookings = bookings.length > 0;
        });
    },

    async fetchAllOverdueBookings() {
      axiosInstance
        .get(`${import.meta.env.VITE_BACKEND_URL}/bookings?status=overdue`)
        .then((response) => {
          const bookings = Array.isArray(response.data) ? response.data : [];
          this.setOverdueBookings(bookings);
          this.hasBookingsOverdue = bookings.length > 0;
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
            const toast = useToast();
            this.triggerBookingModule();
            toast.success("Buchung war erfolgreich");
            this.selectedEntitiesForBooking.length = 0;
          })
          .catch((error: AxiosError) => {
            this.throwBookingErrorToast(error);
          });
      }
    },

    throwBookingErrorToast(error: AxiosError) {
      const toast = useToast();

      if (error.response && error.response.status === 400) {
        this.checkAndThrowBookingLimit(error);
        this.checkBookingDays(error);
        const data = error.response.data;
        this.checkBookingDates(data);
      }

      toast.error("Ein unbekannter Fehler ist aufgetreten");
    },
    checkBookingDays(error: AxiosError) {
      const toast = useToast();

      if (
        error.response?.data ===
        "Booking cannot be extended by more then 7 days"
      ) {
        toast.error("Buchung darf nicht mehr als sieben Tage gehen");
      }
    },

    checkIfEntityWasNotAlreadyBookedInThisTime(error: AxiosError) {
      const toast = useToast();

      if (error.response?.data === "Booking was already booked") {
        toast.error("Entität wurde für den Zeitraum gebucht");
      }
    },
    checkBookingDates(data: unknown) {
      const toast = useToast();

      if (
        data?.title === "Constraint Violation" &&
        Array.isArray(data.violations)
      ) {
        const hasMissingDate = data.violations.some(
          (violation) =>
            violation.message === "Start date must be set" ||
            violation.message === "End date must be set"
        );

        if (hasMissingDate) {
          toast.error("Bitte gebe dein Buchungszeitraum ein");
        }
      }
    },

    checkAndThrowBookingLimit(error: AxiosError) {
      const toast = useToast();

      if (error.response?.data === "Booking limit has been reached") {
        toast.error("Du darfst nicht mehr als fünf aktuelle Buchungen haben");
      }
      if (error.response?.data === "Booking limit would be reached") {
        toast.error(
          "Du würdest mit dieser Buchung das Buchungslimit von fünf überschreiben"
        );
      }
    },

    createBookings(
      selectedEntitiesForBooking: BookingEntity[],
      startDate: Date,
      endDate: Date
    ) {
      let bookings: Partial<Booking>[] = [];
      selectedEntitiesForBooking.forEach((bookingEntity) => {
        const booking: Partial<Booking> = {
          bookingEntity,
          startDate,
          endDate,
        };
        bookings.push(booking);
      });
      return bookings;
    },

    async returnBooking() {
      if (this.bookingToReturn) {
        await axiosInstance
          .put(
            `${import.meta.env.VITE_BACKEND_URL}/bookings/${this.bookingToReturn.id}/return`,
          )
          .then(() => {
            const toast = useToast();
            toast.success("Buchung wurde erfolgreich zurückgegeben");
          });
      }
    },

    async cancelBooking() {
      if (this.bookingToCancel) {
        await axiosInstance
          .put(
            `${import.meta.env.VITE_BACKEND_URL}/bookings/${this.bookingToCancel.id}/cancel`,
          )
          .then(() => {
            const toast = useToast();
            toast.success("Buchung wurde erfolgreich storniert");
          });
      }
    },
  },
});
