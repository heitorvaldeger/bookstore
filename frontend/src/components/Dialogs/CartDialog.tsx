import { Cross1Icon } from "@radix-ui/react-icons";
import { Dialog } from "radix-ui";
import { ShoppingBag } from "react-feather";
import { InputNumberIncremental } from "../Forms/InputNumberIncremental";
import { useCart } from "../../contexts/CartContext";

export const CartDialog = () => {
  const { getQtyBookCart } = useCart();

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <div className="flex flex-col items-center relative">
          <div className="w-4 absolute bg-teal-700 ml-5 -mt-2 text-white text-xs rounded-full flex justify-center items-center">
            {getQtyBookCart()}
          </div>
          <ShoppingBag size={20} />
        </div>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-gray-500 opacity-30 animate-overlayShow" />
        <Dialog.Content className="fixed top-1/2 left-1/2 max-h-[74vh] max-w-[485px] bg-white -translate-1/2 rounded-3xl border-[3px] border-slate-200 animate-contentShow">
          <main className="px-6 py-4">
            <header className="flex justify-between border-b-[1px] border-b-slate-200 pb-4">
              <div className="flex gap-4 items-center">
                <div className="w-11 h-11 flex items-center justify-center border-2 border-slate-200 rounded-lg">
                  <ShoppingBag size={17} />
                </div>
                <div>
                  <p className="font-bold text-sm leading-5 text-gray-800">
                    Carrinho
                  </p>
                  <p className="text-xs leading-5">
                    Certifique da sua escolha e finalize a compra
                  </p>
                </div>
              </div>
              <Dialog.Close asChild>
                <div className="flex items-start justify-center cursor-pointer">
                  <Cross1Icon />
                </div>
              </Dialog.Close>
            </header>

            <div className="py-6 overflow-auto max-h-96 space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div className="flex gap-6" key={i}>
                  <div className="max-w-44">
                    <img
                      src="/images/books/book-1.png"
                      alt=""
                      className="rounded-lg"
                    />
                  </div>
                  <div className="w-fit space-y-2">
                    <p className="font-bold leading-[100%]">
                      Cristianismo puro e simples, CS LEWIS
                    </p>
                    <p className="text-teal-700 font-bold ">R$467,90</p>
                    <InputNumberIncremental
                      onValueChange={() => {}}
                      containerClassName="w-4/8"
                    />
                  </div>
                </div>
              ))}
            </div>

            <footer className="my-6 space-y-10 flex flex-col items-center">
              <div className="space-y-2 border-[1px] border-slate-200 px-4 py-2 rounded-lg w-full">
                <div className="flex items-center justify-between">
                  <p className="font-inter text-xs leading-5">
                    Subtotal (2 produtos)
                  </p>
                  <p className="font-inter text-xs font-bold leading-5">
                    R$ 95,90
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <p className="font-inter text-xs leading-5">Frete</p>
                  <p className="font-inter text-xs font-bold leading-5">
                    R$ 0,00
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <p className="font-inter text-xs leading-5">Total</p>
                  <p className="font-inter text-xs font-bold leading-5 text-teal-700">
                    R$ 95,90
                  </p>
                </div>
              </div>

              <button className="max-w-[174px] bg-teal-700 text-white px-6 py-2 rounded-lg font-medium text-sm leading-5">
                Finalizar compra
              </button>
            </footer>
          </main>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
