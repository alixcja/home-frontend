interface Booking {
  id: number,
  userId: string;
  bookingEntity: BookingEntity;
  startDate: Date;
  endDate: Date;
  bookingDate?: Date;
  isCancelled?: boolean;
  isReturned?: boolean;
}