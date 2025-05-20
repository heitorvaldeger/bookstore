import {
  Home as HomeIcon,
  Bell,
  Book,
  Settings,
  ShoppingBag,
  Search,
  AlignLeft,
} from "react-feather";

import avatarImage from "../../assets/images/avatar.png";
import logoImage from "../../assets/images/logo.png";
import productSlide from "../../assets/images/product-slide.png";
import promotionDisplay from "../../assets/images/promotion-display.png";
import { DoubleArrow } from "../../components/Icons/DoubleArrow";
import { ArrowDown } from "../../components/Icons/ArrowDown";
import { BookCard } from "../../components/Cards/BookCard";

export const Home = () => {
  return (
    <main className="h-screen flex">
      <section className="space-y-4 w-2/5 max-w-[241px]">
        <div className="border-b-2 border-slate-100 px-4 py-4">
          <img src={logoImage} alt="Logo - Bookstore" className="w-2/4" />
        </div>

        <div className="flex flex-col gap-6 px-4 h-[440px]">
          <div className="flex gap-2 items-center">
            <HomeIcon size={15} />
            <span className="font-bold text-sm">Início</span>
          </div>
          <div className="flex gap-2 items-center">
            <Bell size={15} />
            <span className="font-bold text-sm">Notificações</span>
          </div>
          <div className="flex gap-2 items-center">
            <Book size={15} />
            <div className="flex flex-1 justify-between items-center">
              <span className="font-bold text-sm">Todos Livros</span>
              <ArrowDown />
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <Settings size={15} />
            <span className="font-bold text-sm">Configurações</span>
          </div>
        </div>

        <div className="flex px-4 space-x-2 items-center border-t-2 border-slate-100 py-4 justify-center">
          <div className="w-7 h-7 rounded-full flex items-center justify-center">
            <img
              src={avatarImage}
              alt="JD"
              className="w-full h-full rounded-full"
            />
          </div>

          <div className="flex flex-1 justify-between">
            <span className="font-roboto">Menino Feliz</span>
            <DoubleArrow />
          </div>
        </div>
      </section>
      <section className="bg-zinc-50 h-full w-full px-6 space-y-4">
        <header className="flex justify-between py-4 border-b-2 border-slate-100 items-center">
          <span className="font-bold text-3xl text-gray-700">Todos Livros</span>
          <ShoppingBag size={17} />
        </header>

        <main className="space-y-6">
          <div className="flex flex-1 justify-between">
            <div className="relative">
              <div className="absolute my-3 ml-3">
                <Search size={12} className="text-slate-700" />
              </div>
              <input
                type="text"
                placeholder="Pesquisar e filtrar"
                className="border-[1px] w-xs rounded-full px-4 py-1 bg-white border-slate-900 pl-7"
              />
            </div>
            <button className="flex gap-2 items-center border-[1px] rounded-full px-2 border-slate-200 cursor-pointer">
              <AlignLeft size={18} />
              <span className="text-xs">Ordernar</span>
            </button>
          </div>

          <div className="flex flex-col items-center gap-2">
            <img src={productSlide} className="object-fill w-full" />
            <div className="flex gap-5">
              <span className="inline-block w-2.5 h-2.5 bg-teal-700 rounded-full"></span>
              <span className="inline-block w-2.5 h-2.5 bg-gray-500 rounded-full"></span>
              <span className="inline-block w-2.5 h-2.5 bg-gray-500 rounded-full"></span>
            </div>
          </div>

          <div className="flex justify-center gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="px-3 py-1 bg-orange-500 rounded-full text-white text-sm"
              >
                Teste
              </div>
            ))}
          </div>

          <section className="flex flex-col gap-2">
            <p className="font-bold text-lg">Novidades</p>

            <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <BookCard key={i} isNew={true} value={467.9} />
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <img src={promotionDisplay} className="object-fill w-full" />

            <section className="flex flex-col gap-2">
              <p className="font-bold text-lg">Promoções</p>

              <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <BookCard
                    key={i}
                    isNew={true}
                    value={467.9}
                    promotionValue={367.9}
                  />
                ))}
              </div>
            </section>
          </section>
        </main>
      </section>
    </main>
  );
};
