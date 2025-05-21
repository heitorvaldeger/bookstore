import { zodResolver } from "@hookform/resolvers/zod";
import { AlignLeft, Search } from "react-feather";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import * as z from "zod";

const bookSearchSchema = z.object({
  q: z.string(),
});

type BookSearchSchema = z.infer<typeof bookSearchSchema>;

export const SubHeader = () => {
  const navigate = useNavigate();
  const { handleSubmit, register } = useForm<BookSearchSchema>({
    defaultValues: {
      q: "",
    },
    resolver: zodResolver(bookSearchSchema),
  });

  const handleSearch = ({ q }: BookSearchSchema) => {
    const qParams = new URLSearchParams();
    if (q) {
      qParams.append("q", q);
    }
    navigate(`books?${qParams.toString()}`);
  };

  return (
    <div className="flex flex-1 justify-between">
      <form onSubmit={handleSubmit(handleSearch)} className="relative">
        <div className="absolute my-3 ml-3">
          <Search size={12} className="text-slate-700" />
        </div>
        <input
          {...register("q")}
          type="text"
          placeholder="Pesquisar e filtrar"
          className="border-[1px] w-xs rounded-full px-4 py-1 bg-white border-slate-900 pl-7"
        />
      </form>
      <button className="flex gap-2 items-center border-[1px] rounded-full px-2 border-slate-200 cursor-pointer">
        <AlignLeft size={18} />
        <span className="text-xs">Ordernar</span>
      </button>
    </div>
  );
};
