export const formatCurrency = (amount: number, currency = "USD") => {
  return new Intl.NumberFormat("en-NG", {
    currency,
    style: "currency",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    compactDisplay: "short",
  }).format(amount);
};

export const getRandomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const getRandomNumber = (max: number) => Math.max(1, Math.round(Math.random() * max));
