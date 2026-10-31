export type PrizeCategory = {
  title: string;
  amount: number | null;
  description: string | null;
  perks: string[];
};

export type PrizeVault = {
  podium: [PrizeCategory, PrizeCategory, PrizeCategory];
  sparkAwards: PrizeCategory[];
};

export const PRIZES: PrizeVault = {
  podium: [
    {
      title: "1st Prize",
      amount: null,
      description: null,
      perks: [],
    },
    {
      title: "2nd Prize",
      amount: null,
      description: null,
      perks: [],
    },
    {
      title: "3rd Prize",
      amount: null,
      description: null,
      perks: [],
    },
  ],
  sparkAwards: [
    {
      title: "Ingenious Spark",
      amount: null,
      description: null,
      perks: [],
    },
    {
      title: "Visionary Spark",
      amount: null,
      description: null,
      perks: [],
    },
  ],
};
