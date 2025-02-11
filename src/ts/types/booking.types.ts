interface BookingEntity {
  id: string;
  name: string;
  description: string;
  type: string;
  isArchived: boolean;
  addedOn: Date;
}

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