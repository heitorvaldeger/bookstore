import { Search } from "react-feather";
import { Input } from "@/components/Forms/Input";
import { useSubHeader } from "./useSubHeader";

export const SubHeader = () => {
  const { handleSearch, handleSubmit, register, errors } = useSubHeader();

  return (
    <div className="flex flex-1 justify-between">
      <form onSubmit={handleSubmit(handleSearch)} className="relative">
        <div className="absolute my-3 ml-3">
          <Search size={12} className="text-slate-700" />
        </div>
        <Input
          {...register("q")}
          type="text"
          placeholder="Pesquisar e filtrar"
          className="border-[1px] w-xs rounded-full px-4 py-1 bg-white border-slate-900 pl-7"
          error={errors.q?.message}
        />
      </form>
    </div>
  );
};
