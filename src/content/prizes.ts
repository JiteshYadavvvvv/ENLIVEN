export type PlacePrize = {
  amount: number | null;
  description: string | null;
  perks: string[];
};

export type SpecialAward = {
  title: string;
  amount: number | null;
  description: string | null;
};

export type PrizeVault = {
  first: PlacePrize;
  second: PlacePrize;
  third: PlacePrize;
  specialAwards: SpecialAward[];
};

export const PRIZES: PrizeVault = {
  first: {
    amount: null,
    description: null,
    perks: [],
  },
  second: {
    amount: null,
    description: null,
    perks: [],
  },
  third: {
    amount: null,
    description: null,
    perks: [],
  },
  specialAwards: [],
};
