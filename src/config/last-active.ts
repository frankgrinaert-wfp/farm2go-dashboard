export type LastActive = {
  activity: string;
  /** ISO-8601 date-time (local offset optional). */
  at: string;
} | null;

export type AggregatorLastActivity =
  | "Farmer registered"
  | "Deposit collected"
  | "Harvest recorded"
  | "Farmland event created"
  | "Offer responded"
  | "Exchange recorded"
  | "Farmer payment recorded"
  | "Agro-advisory message read"
  | "Farmer training";

export type BuyerLastActivity =
  | "Direct offer"
  | "Demand offer"
  | "Bid created"
  | "Negotiation"
  | "Offer accepted";

export type AggregatorLastActive =
  | {
      activity: AggregatorLastActivity;
      at: string;
    }
  | null;

export type BuyerLastActive =
  | {
      activity: BuyerLastActivity;
      at: string;
    }
  | null;
