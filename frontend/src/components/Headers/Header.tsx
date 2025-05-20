import { ShoppingBag } from "react-feather";

export const Header = () => {
  return (
    <header className="flex justify-between py-4 border-b-2 border-slate-100 items-center">
      <span className="font-bold text-3xl text-gray-700">Todos Livros</span>
      <ShoppingBag size={17} />
    </header>
  );
};
