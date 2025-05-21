import { RadioGroup } from "radix-ui";
import { RadioItem } from "../../../components/Forms/RadioItem";
import { useState } from "react";
import { InputNumberIncremental } from "../../../components/Forms/InputNumberIncremental";
import { ArrowRight, ShoppingBag } from "react-feather";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchBook } from "../../../api/fetch-book";
import { convertNumberToBrazilianRealFormat } from "../../../utils";
import { isAxiosError } from "axios";

export const BookDetail = () => {
  const [color, setColor] = useState("Azul");
  const { id } = useParams();

  const {
    data: book,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["books", id],
    queryFn: () => fetchBook({ idBook: id ?? "" }),
    enabled: !!id,
    retry: false,
  });

  const valueBrazilianFormatted = convertNumberToBrazilianRealFormat(
    (book?.price ?? 0) / 100
  );

  const valueInstallmentBrazilianFormatted = convertNumberToBrazilianRealFormat(
    (book?.price ?? 0) / 2 / 100
  );

  if (isAxiosError(error)) {
    if (error.status === 404) {
      return (
        <div className="h-screen">
          <span>Nenhum livro encontrado</span>
        </div>
      );
    }
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
      <div className="flex gap-1 text-black font-inter">
        <span>Início</span>
        <span>{">"}</span>
        <span>Livros</span>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:flex lg:gap-8">
        <section className="flex-1">
          <img
            src={book?.imageURL ?? "/images/cover-not-avaiable.png"}
            className="rounded-xl max-w-[473px] mx-auto lg:mx-0"
          />
        </section>
        <section className="flex-1 space-y-2">
          <p className="text-4xl font-bold">
            {book?.title}, {book?.author}
          </p>
          <div>
            <p className="text-teal-700 font-bold text-2xl font-inter">
              {valueBrazilianFormatted}
            </p>
            <p className="font-inter">
              ou 2x {valueInstallmentBrazilianFormatted} sem juros
            </p>
          </div>

          <div>
            <p>{book?.description}</p>
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

          <div className="space-y-2 my-6">
            <p className="font-inter font-bold text-lg">
              Cor:
              <span className="font-inter font-normal mx-1">{color}</span>
            </p>
            <RadioGroup.Root
              defaultValue={color}
              onValueChange={setColor}
              className="flex gap-4"
            >
              <RadioGroup.Item value="Laranja" asChild>
                <div className="w-7 h-7 cursor-pointer bg-orange-300 rounded-full data-[state=checked]:border-2 data-[state=checked]:border-white data-[state=checked]:outline-2"></div>
              </RadioGroup.Item>
              <RadioGroup.Item value="Azul" asChild>
                <div className="w-7 h-7 cursor-pointer bg-blue-400 rounded-full data-[state=checked]:border-2 data-[state=checked]:border-white data-[state=checked]:outline-2"></div>
              </RadioGroup.Item>
              <RadioGroup.Item value="Amarelo Claro" asChild>
                <div className="w-7 h-7 cursor-pointer bg-orange-200 rounded-full data-[state=checked]:border-2 data-[state=checked]:border-white data-[state=checked]:outline-2"></div>
              </RadioGroup.Item>
              <RadioGroup.Item value="Branco" asChild>
                <div className="w-7 h-7 cursor-pointer border-[1px] border-zinc-200 bg-white rounded-full data-[state=checked]:border-2 data-[state=checked]:border-white data-[state=checked]:outline-2"></div>
              </RadioGroup.Item>
              <RadioGroup.Item value="Cinza" asChild>
                <div className="w-7 h-7 cursor-pointer bg-gray-400 rounded-full data-[state=checked]:border-2 data-[state=checked]:border-white data-[state=checked]:outline-2"></div>
              </RadioGroup.Item>
            </RadioGroup.Root>
          </div>

          <div className="space-y-4 my-4">
            <div>
              <p className="font-inter font-bold text-lg">Quantidade</p>
              <p className="font-inter font-normal">
                ⚠️ Para este produto quantidade mínima é:
              </p>
            </div>

            <InputNumberIncremental />
          </div>

          <div className="my-10 flex flex-col gap-4">
            <button className="flex items-center w-[290px] h-[45.71px] justify-center gap-3.5 rounded-lg bg-gray-950 text-white">
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

          <div className="space-y-1 my-4 w-fit">
            <p className="font-bold text-lg font-inter">Cálculo de frete</p>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Digite seu CEP para calcular"
                  className="border-[1px] w-xs rounded-lg px-4 py-3 bg-white border-slate-900 pl-4 text-sm font-inter"
                />
                <button className="bg-black text-white p-3.5 rounded-lg">
                  <ArrowRight size={17} />
                </button>
              </div>
              <p className="mx-4 text-sm underline">Não sei o meu CEP</p>
            </div>

            <div className="flex flex-col gap-2 my-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="border-[0.88px] border-gray-200 px-4 py-2 flex justify-between items-center rounded-lg"
                >
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-800 font-semibold font-inter">
                      Nome do Frete
                    </span>
                    <span className="font-inter text-sm text-gray-800 font-light">
                      Prazo
                    </span>
                  </div>
                  <span className="font-inter text-sm font-light">Preço</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
