export type FarmerActivity = "Active" | "Inactive" | "No recent activity";

export type FarmerRow = {
  id: string;
  name: string;
  region: string;
  commodities: string[];
  aggregationCentre: string;
  dateRegistered: string;
  lastDeposit: string;
  activity: FarmerActivity;
};

export const FARMERS_LIST_ROWS: FarmerRow[] = [
  {
    id: "1",
    name: "Alex Jannetta",
    region: "Dakkin Methachari",
    commodities: ["Ash Gourd", "Banana inflorescence"],
    aggregationCentre: "Kutupalong Agricultural Centre",
    dateRegistered: "28 Jul 2025",
    lastDeposit: "Yesterday",
    activity: "Active",
  },
  {
    id: "2",
    name: "Alex Jannetta",
    region: "Dakkin Methachari",
    commodities: ["Ash Gourd", "Banana inflorescence"],
    aggregationCentre: "Kutupalong Agricultural Centre",
    dateRegistered: "28 Jul 2025",
    lastDeposit: "Yesterday",
    activity: "Active",
  },
  {
    id: "3",
    name: "Alex Jannetta",
    region: "Dakkin Methachari",
    commodities: ["Ash Gourd", "Banana inflorescence"],
    aggregationCentre: "Kutupalong Agricultural Centre",
    dateRegistered: "28 Jul 2025",
    lastDeposit: "Yesterday",
    activity: "Active",
  },
  {
    id: "4",
    name: "Alex Jannetta",
    region: "Dakkin Methachari",
    commodities: ["Ash Gourd", "Banana inflorescence"],
    aggregationCentre: "Kutupalong Agricultural Centre",
    dateRegistered: "28 Jul 2025",
    lastDeposit: "Yesterday",
    activity: "Active",
  },
  {
    id: "5",
    name: "Alex Jannetta",
    region: "Dakkin Methachari",
    commodities: ["Ash Gourd", "Banana inflorescence"],
    aggregationCentre: "Kutupalong Agricultural Centre",
    dateRegistered: "28 Jul 2025",
    lastDeposit: "Yesterday",
    activity: "Active",
  },
  {
    id: "6",
    name: "Alex Jannetta",
    region: "Dakkin Methachari",
    commodities: ["Ash Gourd", "Banana inflorescence"],
    aggregationCentre: "Kutupalong Agricultural Centre",
    dateRegistered: "28 Jul 2025",
    lastDeposit: "Yesterday",
    activity: "Active",
  },
  {
    id: "7",
    name: "Alex Jannetta",
    region: "Dakkin Methachari",
    commodities: ["Ash Gourd", "Banana inflorescence"],
    aggregationCentre: "Kutupalong Agricultural Centre",
    dateRegistered: "28 Jul 2025",
    lastDeposit: "Yesterday",
    activity: "Active",
  },
  {
    id: "8",
    name: "Alex Jannetta",
    region: "Dakkin Methachari",
    commodities: ["Ash Gourd", "Banana inflorescence"],
    aggregationCentre: "Kutupalong Agricultural Centre",
    dateRegistered: "28 Jul 2025",
    lastDeposit: "Yesterday",
    activity: "Active",
  },
  {
    id: "9",
    name: "Alex Jannetta",
    region: "Dakkin Methachari",
    commodities: ["Ash Gourd", "Banana inflorescence"],
    aggregationCentre: "Kutupalong Agricultural Centre",
    dateRegistered: "28 Jul 2025",
    lastDeposit: "Yesterday",
    activity: "Active",
  },
  {
    id: "10",
    name: "Alex Jannetta",
    region: "Dakkin Methachari",
    commodities: ["Ash Gourd", "Banana inflorescence"],
    aggregationCentre: "Kutupalong Agricultural Centre",
    dateRegistered: "28 Jul 2025",
    lastDeposit: "Yesterday",
    activity: "Active",
  },
];
