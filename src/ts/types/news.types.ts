import { NewsType } from "../newstypes.enums";

export interface News {
    type: NewsType;
    entity?: BookingEntity;
  }
  