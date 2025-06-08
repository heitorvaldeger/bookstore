import { Link } from "react-router";
import { convertPriceBook } from "@/utils";

interface BookCardProps {
  idBook: number;
  titulo: string;
  autor: string;
  preco: number;
  imagem?: string | null;
}
export const BookCard = ({
  idBook,
  titulo,
  autor,
  preco,
  imagem,
}: BookCardProps) => {
  const valueBrazilianFormatted = convertPriceBook(preco);

  const isNew = false;

  return (
    <Link
      to={`/books/${idBook}`}
      className="flex flex-col space-y-2 cursor-pointer"
      data-testid={`book-card-${idBook}`}
    >
      <div className="rounded-lg relative">
        {isNew && (
          <div className="mt-2 mx-2 w-fit font-inter absolute text-xs text-white bg-teal-700 rounded-tl-lg rounded-b-sm rounded-tr-sm px-2 py-1">
            novidade
          </div>
        )}
        <img
          src={imagem ?? "/images/cover-not-avaiable.png"}
          alt=""
          className="object-fill h-[265px]"
        />
      </div>

      <p className="font-normal text-xs">
        {titulo}, {autor}
      </p>
      <p className="font-bold text-xs text-gray-900">
        {valueBrazilianFormatted}
      </p>
    </Link>
  );
};
