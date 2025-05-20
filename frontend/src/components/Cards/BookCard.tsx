import { useNavigate } from "react-router";
import { convertNumberToBrazilianRealFormat } from "../../utils";

interface BookCardProps {
  idBook: number;
  title: string;
  author: string;
  price: number;
  imageURL?: string;
}
export const BookCard = ({
  idBook,
  title,
  author,
  price,
  imageURL,
}: BookCardProps) => {
  const navigate = useNavigate();
  const valueBrazilianFormatted = convertNumberToBrazilianRealFormat(
    price / 100
  );

  const isNew = false;

  const handleClickBookCard = () => {
    navigate(`books/${idBook}`);
  };

  return (
    <div onClick={handleClickBookCard} className="flex flex-col space-y-2">
      <div className="rounded-lg relative">
        {isNew && (
          <div className="mt-2 mx-2 w-fit font-inter absolute text-xs text-white bg-teal-700 rounded-tl-lg rounded-b-sm rounded-tr-sm px-2 py-1">
            novidade
          </div>
        )}
        <img
          src={imageURL ?? "/images/cover-not-avaiable.png"}
          alt=""
          className="object-fill"
        />
      </div>

      <p className="font-normal text-xs">
        {title}, {author}
      </p>
      <p className="font-bold text-xs text-gray-900">
        {valueBrazilianFormatted}
      </p>
    </div>
  );
};
