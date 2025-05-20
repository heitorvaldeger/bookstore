import { RadioGroup } from "radix-ui";
import { RadioItem } from "../../../components/Forms/RadioItem";
import { useState } from "react";
import { InputNumberIncremental } from "../../../components/Forms/InputNumberIncremental";

export const BookDetail = () => {
  const [color, setColor] = useState("Azul");

  return (
    <div className="flex flex-col">
      <div className="flex gap-1 text-black font-inter">
        <span>Início</span>
        <span>{">"}</span>
        <span>Livros</span>
      </div>
      <div className="flex gap-8">
        <section>
          <img src="/images/books/book-1.png" className="w-[30rem]" />
        </section>
        <section className="flex-1 space-y-2">
          <p className="text-4xl font-bold">
            Cristianismo puro e simples, CS LEWIS
          </p>
          <div>
            <p className="text-teal-700 font-bold text-2xl font-inter">
              R$ 567,90
            </p>
            <p className="font-inter">ou 2x 233,95 sem juros</p>
          </div>

          <div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
              non praesentium repudiandae cumque incidunt dolorum itaque quam
              vitae aliquid, distinctio dolores, fugit reiciendis libero rem.
              Atque dignissimos dolorem amet soluta! Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Error, eaque doloribus. Animi quis
              explicabo maxime similique quibusdam earum exercitationem.
              Deleniti aut iste eum ad maiores at necessitatibus eveniet
              sapiente nemo.
            </p>
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
        </section>
      </div>
    </div>
  );
};
