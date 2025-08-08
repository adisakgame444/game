export const formatPrice = (price: number) => {
  const newPrice = new Intl.NumberFormat("th-TH", {
    currency: "THB",
    style: "currency",
    maximumFractionDigits: 0
  });

  return newPrice.format(price);
};
