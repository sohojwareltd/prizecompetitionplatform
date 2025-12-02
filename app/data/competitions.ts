export type CompetitionCategory = "cars" | "cash" | "tech" | "lifestyle";

export interface Competition {
  id: string;
  title: string;
  category: CompetitionCategory;
  endsInDays: number;
  price: string;
  progress: number;
  ticketsPerUser?: number;
}

export const competitions: Competition[] = [
  {
    id: "1",
    title: "Tesla Model X Plaid + £10,000 cash",
    category: "cars",
    endsInDays: 2,
    price: "£3.99",
    progress: 72,
    ticketsPerUser: 50,
  },
  {
    id: "2",
    title: "£50,000 tax-free cash drop",
    category: "cash",
    endsInDays: 1,
    price: "£1.99",
    progress: 81,
    ticketsPerUser: 50,
  },
  {
    id: "3",
    title: "Ultimate Gaming Vault: PS5 Pro, RTX PC & triple monitor",
    category: "tech",
    endsInDays: 4,
    price: "£0.99",
    progress: 44,
    ticketsPerUser: 50,
  },
];


