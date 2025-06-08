import * as z from "zod";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Dialog } from "radix-ui";
import { type ComponentProps } from "react";
import { Button } from "../Forms/Button";
import { Input } from "../Forms/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessagesValidation } from "@/constans/messages-validation";

const saveBookFormSchema = z.object({
  titulo: z.string().min(3, MessagesValidation.MUST_BE_STRING_LEAST(3)),
  autor: z.string().min(3, MessagesValidation.MUST_BE_STRING_LEAST(3)),
  descricao: z.string().optional(),
  imagem: z.string().url(MessagesValidation.MUST_BE_URL_VALID).nullable(),
  estoque: z
    .number({
      message: MessagesValidation.MUST_BE_NUMBER,
    })
    .positive(),
  preco: z
    .number({
      message: MessagesValidation.MUST_BE_NUMBER,
    })
    .positive()
    .transform((arg) => arg * 100),
});

type SaveBookFormSchema = z.infer<typeof saveBookFormSchema>;

type BookDialogProps = ComponentProps<typeof Dialog.Trigger>;
export const BookDialog = ({ children }: BookDialogProps) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<SaveBookFormSchema>({
    resolver: zodResolver(saveBookFormSchema),
    mode: "onSubmit",
    defaultValues: {
      imagem: null,
    },
  });

  const handleSaveBookClick = async (data: SaveBookFormSchema) => {
    try {
      console.log(data);
      // await authenticate(data);
      // navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseClick = () => {
    reset();
  };

  return (
    <Dialog.Root
      onOpenChange={(open) => {
        if (!open) handleCloseClick();
      }}
    >
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-gray-500 opacity-30 animate-overlayShow" />
        <Dialog.Content className="fixed overflow-auto lg:overflow-hidden top-1/2 left-1/2 max-h-[74vh] w-5/6 lg:max-w-[485px] bg-white -translate-1/2 rounded-3xl border-[3px] border-slate-200 animate-contentShow">
          <form
            className="px-6 py-4"
            onSubmit={handleSubmit(handleSaveBookClick, (errors) => {
              console.log(errors);
            })}
          >
            <header className="flex justify-between border-b-[1px] border-b-slate-200 pb-4">
              <Dialog.Title>Novo Produto</Dialog.Title>
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
                    {...register("preco", {
                      valueAsNumber: true,
                    })}
                    error={errors.preco?.message}
                  />
                </div>
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
