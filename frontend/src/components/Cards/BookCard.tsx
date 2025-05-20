interface BookCardProps {
  isNew?: boolean;
  value: number;
  promotionValue?: number;
}
export const BookCard = ({
  isNew = false,
  value,
  promotionValue,
}: BookCardProps) => {
  const valueBrazilianFormatted = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const promotionValueBrazilianFormatted =
    promotionValue &&
    promotionValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  return (
    <div className="flex flex-col space-y-2">
      <div className="rounded-lg relative">
        {isNew && (
          <div className="mt-2 mx-2 w-fit font-inter absolute text-xs text-white bg-teal-700 rounded-tl-lg rounded-b-sm rounded-tr-sm px-2 py-1">
            novidade
          </div>
        )}
        <img src="/images/books/book-1.png" alt="" className="object-fill" />
      </div>

      <p className="font-normal text-xs">
        Cristianismo puro e simples, CS LEWIS
      </p>
      {!promotionValueBrazilianFormatted ? (
        <p className="font-bold text-xs text-gray-900">
          {valueBrazilianFormatted}
        </p>
      ) : (
        <div className="flex gap-4 items-center">
          <span className="text-red-600 font-bold text-xs">
            {promotionValueBrazilianFormatted}
          </span>

          <span className="font-normal font-inter line-through text-xs">
            {valueBrazilianFormatted}
          </span>

          <span className="border-red-600 text-red-600 border-[0.75px] rounded-sm text-xs px-1">
            -53%
          </span>
        </div>
      )}
    </div>
  );
};
