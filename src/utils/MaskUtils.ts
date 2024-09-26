export const currencyMask = (value) => {
  if (!value) return "";

  const numericValue = value.replace(/\D/g, "");

  const formattedValue = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(numericValue));

  return formattedValue;
};
