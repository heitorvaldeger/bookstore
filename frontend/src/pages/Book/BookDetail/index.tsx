import { RadioGroup } from "radix-ui";
import { RadioItem } from "@/components/Forms/RadioItem";
import { InputNumberIncremental } from "@/components/Forms/InputNumberIncremental";
import { Edit2, ShoppingBag, Trash } from "react-feather";
import { isAxiosError } from "axios";
import { useBookDetail } from "./useBookDetail";
import { ColorChoiceSection } from "./components/ColorChoiceSection";
import { ShippingSection } from "./components/ShippingSection";
import { Button } from "@/components/Forms/Button";
import { useAdmin } from "@/contexts/AdminContext";
import { BookDialog } from "@/components/Dialogs/BookDialog";

export const BookDetail = () => {
  const {
    error,
    isLoading,
    book,
    qty,
    valueBrazilianFormatted,
    valueInstallmentBrazilianFormatted,
    handleQtyChange,
    handleAddBookToCartClick,
    handleDeleteBookClick,
  } = useBookDetail();

  const { isLogged } = useAdmin();

  if (isAxiosError(error) && error.status === 404) {
    return (
      <div className="h-screen">
        <span>Nenhum livro encontrado</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="h-screen">
        <span>Carregando...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-1 text-black font-inter">
          <span>Início</span>
          <span>{">"}</span>
          <span>Livros</span>
        </div>

        {isLogged && (
          <div className="flex gap-2">
            <Button
              onClick={handleDeleteBookClick}
              className="flex items-center justify-center gap-2 text-white rounded-md bg-red-700 p-2"
            >
              <Trash size={15} />
              Apagar
            </Button>

            <BookDialog book={book}>
              <Button className="bg-blue-500 p-2 rounded-md text-white flex gap-2 justify-center items-center font-bold text-sm">
                <Edit2 size={15} />
                Editar
              </Button>
            </BookDialog>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 gap-4 lg:flex lg:gap-8">
        <section className="flex-1 lg:max-w-[500px]">
          <img
            src={book?.imagem ?? "/images/cover-not-avaiable.png"}
            className="rounded-xl w-full"
          />
        </section>
        <section className="flex-1 space-y-2">
          <p data-testid="book.title-author" className="text-4xl font-bold">
            {book?.titulo}, {book?.autor}
          </p>
          <div>
            <p
              data-testid="book.price"
              className="text-teal-700 font-bold text-2xl font-inter"
            >
              {valueBrazilianFormatted}
            </p>
            <p className="font-inter">
              ou 2x {valueInstallmentBrazilianFormatted} sem juros
            </p>
          </div>

          <div>
            <p>{book?.descricao}</p>
          </div>

          <div className="space-y-2 mt-10">
            <p className="font-inter font-bold text-lg">Variação</p>
            <RadioGroup.Root defaultValue="k" className="flex gap-4">
              <RadioGroup.Item value="cd" asChild>
                <RadioItem>Capa Dura</RadioItem>
              </RadioGroup.Item>
              <RadioGroup.Item value="cb" asChild>
                <RadioItem>Capa Brochura</RadioItem>
              </RadioGroup.Item>
              <RadioGroup.Item value="k" asChild>
                <RadioItem>Kindle</RadioItem>
              </RadioGroup.Item>
            </RadioGroup.Root>
          </div>

          <ColorChoiceSection />

          <div className="space-y-4 my-4">
            <div>
              <p className="font-inter font-bold text-lg">Quantidade</p>
              <p className="font-inter font-normal">
                ⚠️ Para este produto quantidade mínima é:
              </p>
            </div>

            <InputNumberIncremental
              value={qty}
              onValueChange={handleQtyChange}
            />
          </div>

          <div className="my-10 flex flex-col gap-4">
            <button
              onClick={handleAddBookToCartClick}
              className="cursor-pointer flex items-center w-[290px] h-[45.71px] justify-center gap-3.5 rounded-lg bg-gray-950 text-white"
            >
              <ShoppingBag />
              <span className="font-bold font-inter text-sm">
                Adicionar à sacola
              </span>
            </button>
            <button className="flex rounded-lg items-center w-[290px] h-[45.71px] gap-3.5 justify-center text-green-600 border-green-600 border-[1.5px]">
              <img src="/images/whatsapp-icon.png" />
              <span className="font-bold font-inter text-sm">
                Tem alguma dúvida?
              </span>
            </button>
          </div>

          <ShippingSection />
        </section>
      </div>
    </div>
  );
};
