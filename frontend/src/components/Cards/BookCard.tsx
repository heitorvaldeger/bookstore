interface BookCardProps {
  isNew?: boolean;
}
export const BookCard = ({ isNew = false }: BookCardProps) => {
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
      <p className="font-bold text-xs text-gray-900">R$ 467,90</p>
    </div>
  );
};
