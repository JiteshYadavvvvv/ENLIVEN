export type EventConfig = {
  edition: string;
  line: string;
  host: string;
  startsAt: string;
  dateAnnounced: boolean;
  resultsAt: string | null;
};

export const EVENT: EventConfig = {
  edition: "ENLIVEN 4",
  line: "EN-04",
  host: "GDG AIT Pune",
  startsAt: "2027-03-13T09:00:00+05:30",
  dateAnnounced: false,
  resultsAt: null,
};
