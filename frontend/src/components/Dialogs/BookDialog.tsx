import { Cross1Icon } from "@radix-ui/react-icons";
import { Dialog } from "radix-ui";
import { type ComponentProps } from "react";
import { Button } from "../Forms/Button";
import { Input } from "../Forms/Input";
import { BookCategoryEnum, type Book } from "@/models/book";
import { useBookDialog } from "./useBookDialog";

interface BookDialogProps extends ComponentProps<typeof Dialog.Trigger> {
  book?: Book;
}

export const BookDialog = ({ children, book }: BookDialogProps) => {
  const {
    onOpenDialogChange,
    handleSaveBookClick,
    handleSubmit,
    register,
    errors,
    isOpen,
  } = useBookDialog(book);

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenDialogChange}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-gray-500 opacity-30 animate-overlayShow" />
        <Dialog.Content className="fixed overflow-auto lg:overflow-hidden top-1/2 left-1/2 max-h-[74vh] w-5/6 lg:max-w-[485px] bg-white -translate-1/2 rounded-3xl border-[3px] border-slate-200 animate-contentShow">
          <form
            className="px-6 py-4"
            onSubmit={handleSubmit(handleSaveBookClick)}
          >
            <header className="flex justify-between border-b-[1px] border-b-slate-200 pb-4">
              <Dialog.Title>{book ? "Editando" : "Novo"} Produto</Dialog.Title>
              <Dialog.Close asChild>
                <div className="flex items-start justify-center cursor-pointer">
                  <Cross1Icon />
                </div>
              </Dialog.Close>
            </header>

            <div className="py-6 lg:overflow-auto lg:max-h-96 space-y-4 pr-2">
              <div className="flex flex-col">
                <label className="text-sm" htmlFor="title">
                  Título *
                </label>
                <Input
                  id="title"
                  className="border-[1px] w-auto rounded-md bg-white border-slate-900 px-2 py-1"
                  {...register("titulo")}
                  error={errors.titulo?.message}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm" htmlFor="author">
                  Autor *
                </label>
                <Input
                  id="author"
                  className="border-[1px] w-full rounded-md bg-white border-slate-900 px-2 py-1"
                  {...register("autor")}
                  error={errors.autor?.message}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm" htmlFor="description">
                  Descrição
                </label>
                <textarea
                  id="description"
                  className="border-[1px] w-full rounded-md bg-white border-slate-900 px-2 py-1"
                  {...register("descricao")}
                ></textarea>
              </div>

              <div className="flex flex-col">
                <label className="text-sm" htmlFor="imageURL">
                  Imagem URL
                </label>
                <Input
                  id="imageURL"
                  className="border-[1px] w-full rounded-md bg-white border-slate-900 px-2 py-1"
                  {...register("imagem")}
                  error={errors.imagem?.message}
                />
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col">
                  <label className="text-sm" htmlFor="stock">
                    Estoque *
                  </label>
                  <Input
                    id="stock"
                    type="number"
                    className="border-[1px] w-full rounded-md bg-white border-slate-900 px-2 py-1"
                    {...register("estoque", {
                      valueAsNumber: true,
                    })}
                    error={errors.estoque?.message}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm" htmlFor="price">
                    Preço *
                  </label>
                  <Input
                    id="price"
                    type="number"
                    className="border-[1px] w-full rounded-md bg-white border-slate-900 px-2 py-1"
                    step="any"
                    {...register("preco", {
                      valueAsNumber: true,
                    })}
                    error={errors.preco?.message}
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-sm" htmlFor="category">
                  Categoria *
                </label>
                <select
                  id="category"
                  className="border-[1px] w-full rounded-md bg-white border-slate-900 px-2 py-1"
                  {...register("categoria")}
                >
                  <option value={BookCategoryEnum.BIBLE}>Bíblia</option>
                  <option value={BookCategoryEnum.PHILOSOPHY}>Filosofia</option>
                  <option value={BookCategoryEnum.SCIENCE}>Ciência</option>
                  <option value={BookCategoryEnum.TEOLOGY}>Teologia</option>
                  <option value={BookCategoryEnum.OTHERS}>Outros</option>
                </select>
              </div>
            </div>

            <footer className="my-6 flex items-center justify-center gap-2">
              <Dialog.Close asChild>
                <Button className=" text-gray-400 border-gray-400 border-[1px] px-6 py-2 rounded-lg font-medium text-sm">
                  Cancelar
                </Button>
              </Dialog.Close>

              <Button
                type="submit"
                className="bg-teal-700 text-white px-6 py-2 rounded-lg font-medium text-sm"
              >
                Salvar
              </Button>
            </footer>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
