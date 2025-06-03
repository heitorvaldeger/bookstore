import { ArrowRight } from "react-feather";

export const ShippingSection = () => {
  return (
    <div className="space-y-1 my-4">
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

      <div className="flex flex-col gap-2 my-4 max-w-[500px]">
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
  );
};
