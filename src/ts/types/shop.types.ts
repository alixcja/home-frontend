interface Shop {
  id: number;
  name: string;
  website: string;
  phoneNumber: string;
  lastUpdated: Date;
  isArchived: boolean;
  menuCardCount: number;
  address: Address;
}

interface OpeningHours {
  shopId: number;
  from: Date;
  to: Date;
  lastUpdated: Date;
  weekday: Weekday
}

enum Weekday {
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
  Saturday = "Saturday",
  Sunday = "Sunday",
}

interface Address {
    streetNumber: string;
    streetName: string;
    postalCode: number;
    city: string;
}

export { Weekday };
export type { Shop, OpeningHours, Address };
