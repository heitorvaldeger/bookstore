import productSlide from "../../assets/images/product-slide.png";
import promotionDisplay from "../../assets/images/promotion-display.png";
import { BookCard } from "../../components/Cards/BookCard";
import { CaretRightIcon } from "@radix-ui/react-icons";
import { CategoryList } from "./components/CategoryList";
import { useHome } from "./useHome";

export const Home = () => {
  const { booksSliced } = useHome();

  return (
    <main className="space-y-6">
      <div className="flex flex-col items-center gap-2">
        <img src={productSlide} className="object-fill w-full" />
        <div className="flex gap-5">
          <span className="inline-block w-2.5 h-2.5 bg-teal-700 rounded-full"></span>
          <span className="inline-block w-2.5 h-2.5 bg-gray-500 rounded-full"></span>
          <span className="inline-block w-2.5 h-2.5 bg-gray-500 rounded-full"></span>
        </div>
      </div>

      <div className="flex justify-center gap-2">
        <CategoryList />
      </div>

      <section className="flex flex-col gap-2">
        <p className="font-bold text-lg">Novidades</p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {booksSliced?.map((book) => (
            <BookCard
              key={book.id}
              idBook={book.id}
              preco={book.preco}
              titulo={book.titulo}
              autor={book.autor}
              imagem={book.imagem}
            />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <img src={promotionDisplay} className="object-fill w-full" />

        <section className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <p className="font-bold text-lg">Promoções</p>
            <button className="flex items-center font-inter text-xs px-2 py-1 border-[1px] rounded-full">
              Ver mais <CaretRightIcon />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {booksSliced?.map((book) => (
              <BookCard
                key={book.id}
                idBook={book.id}
                preco={book.preco}
                titulo={book.titulo}
                autor={book.autor}
                imagem={book.imagem}
              />
            ))}
          </div>
        </section>
      </section>
    </main>
  );
};
