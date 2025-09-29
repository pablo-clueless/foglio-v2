export const formatCurrency = (amount: number, currency = "USD") => {
  return new Intl.NumberFormat("en-NG", {
    currency,
    style: "currency",
    maximumFractionDigits: 2,
    maximumSignificantDigits: 2,
    minimumFractionDigits: 2,
    minimumSignificantDigits: 2,
    compactDisplay: "short",
  }).format(amount);
};
