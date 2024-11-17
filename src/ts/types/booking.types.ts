import { Entity } from "./entity.types";

export type Booking = {
  bookingId?: number;
  userId: string;
  bookedBookingEntity: Entity;
  startDate: Date;
  endDate: Date;
  bookingDate?: Date;
  isCancelled?: boolean;
  isReturned?: boolean;
};
