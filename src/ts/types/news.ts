import { NewsType } from "../newstypes.enums";

export class News {
  icon: string;
  title: string;
  description: string;
  isClosable: boolean;
  actionButtonTitle: string | undefined;

  constructor(
    icon: string,
    title: string,
    description: string,
    isClosable: boolean,
    actionButtonTitle: string | undefined,
  ) {
    this.icon = icon;
    this.title = title;
    this.description = description;
    this.isClosable = isClosable;
    this.actionButtonTitle = actionButtonTitle;
  }

  static getNewsCard(type: NewsType, entity: BookingEntity, booking: Booking): News {
    if (type === NewsType.NEWS_BOOKING_STARTS_TODAY) {
      return this.getBookingStartsToday(booking);
    }
    if (type === NewsType.NEWS_NEW_ENTITY) {
      return this.newEntity(entity);
    }
    if (type === NewsType.NEWS_OVERDUE_BOOKINGS) {
      return this.overdueBookings(booking);
    }
    if (type === NewsType.NEWS_SOON_OVERDUE_BOOKINGS) {
      return this.soonOverdueBookings(booking);
    } else {
      throw Error("Could not find the right news type");
    }
  }

  static getBookingStartsToday(booking: Booking) {
    const icon = "mdi-gift-outline";
    const title = "Freude liegt in der Luft!";
    const description = `Das lange Warten hat heute ein Ende: Die ${booking.bookingEntity.name} ist bereit, von dir abgeholt zu werden.`;
    const isClosable = false;
    return new News(icon, title, description, isClosable, undefined);
  }

  static newEntity(entity: BookingEntity) {
    const icon = "mdi-new-box";
    const title = "Neu & schnieke";
    const description = `Seit Kurzem gibt es ${entity.name} zum Ausleihen!
                        Sei schnell, bevor es sich deine Arbeitskollegen krallen! `;
    const isClosable = false;
    const actionButtonTitle = "Zur Buchung";
    return new News(
      icon,
      title,
      description,
      isClosable,
      actionButtonTitle,
    );
  }

  static overdueBookings(booking: Booking) {
    const icon = "mdi-alert";
    const title = "Achtung, Achtung!";
    const description = `Die Buchung ${booking.bookingEntity.name} ist am ${booking.endDate} abgelaufen.
                        Vergiss nicht, diese abzugeben, um deine Mitkollegen glücklich zu machen!`;
    const isClosable = false;
    const actionButtonTitle = "Zur Rückgabe";
    return new News(
      icon,
      title,
      description,
      isClosable,
      actionButtonTitle,
    );
  }

  static soonOverdueBookings(booking: Booking) {
    const icon = "mdi-alert";
    const title = "Aufgepasst!";
    const description = `Die Buchung ${booking.bookingEntity.name} ist bald abgelaufen.
                        Vergiss nicht, diese rechtzeitig abzugeben, und dir werden deine Arbeitskollegen danken!`;
    const isClosable = false;
    const actionButtonTitle = "Zur Rückgabe";
    return new News(
      icon,
      title,
      description,
      isClosable,
      actionButtonTitle,
    );
  }
}
