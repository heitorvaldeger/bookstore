export const convertPriceBook = (value: number) => {
  return (Math.trunc(value * 100) / 100 / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};
