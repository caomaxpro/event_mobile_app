import { Event } from "@src/types/types";

export type HomeComponentProp = {
  isDrawerOpened?: boolean;
  isEventDetail?: boolean;
  setEventDetail?: React.Dispatch<React.SetStateAction<boolean>>;
  setDrawerOpened?: React.Dispatch<React.SetStateAction<boolean>>;
  setViewedEvent?: React.Dispatch<React.SetStateAction<Event | null>>;
};