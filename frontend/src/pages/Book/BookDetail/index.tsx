import { RadioGroup } from "radix-ui";
import { RadioItem } from "../../../components/Forms/RadioItem";

export const BookDetail = () => {
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
        </section>
      </div>
    </div>
  );
};
