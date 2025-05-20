import { AlignLeft, Search } from "react-feather";

export const SubHeader = () => {
  return (
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
  );
};
