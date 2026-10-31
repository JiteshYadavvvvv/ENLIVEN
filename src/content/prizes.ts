export type PrizeTier = {
  rank: number;
  title: string;
  amount: string | null;
  perks: string[];
};

export type SpecialAward = {
  title: string;
  amount: string | null;
  description: string;
};

export const PRIZES: {
  note: string;
  pool: string | null;
  podium: PrizeTier[];
  specialAwards: SpecialAward[];
} = {
  note: "Every reward stays locked in the vault until the official prize announcement.",
  pool: null,
  podium: [
    { rank: 1, title: "First place", amount: null, perks: [] },
    { rank: 2, title: "Second place", amount: null, perks: [] },
    { rank: 3, title: "Third place", amount: null, perks: [] },
  ],
  specialAwards: [],
};
