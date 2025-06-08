import * as z from "zod";
import { MessagesValidation } from "@/constans/messages-validation";
import { BookCategoryEnum, type Book } from "@/models/book";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBook } from "@/api/update-book";
import { createBook } from "@/api/create-book";
import { useState } from "react";
import { toast } from "sonner";
import { Messages } from "@/constans/messages";

const saveBookFormSchema = z.object({
  titulo: z.string().min(3, MessagesValidation.MUST_BE_STRING_LEAST(3)),
  autor: z.string().min(3, MessagesValidation.MUST_BE_STRING_LEAST(3)),
  descricao: z.string().optional(),
  imagem: z
    .string()
    .url(MessagesValidation.MUST_BE_URL_VALID)
    .or(z.literal("")),
  estoque: z
    .number({
      message: MessagesValidation.MUST_BE_NUMBER,
    })
    .positive(),
  preco: z
    .number({
      message: MessagesValidation.MUST_BE_NUMBER,
    })
    .positive(),
  categoria: z.nativeEnum(BookCategoryEnum),
});

type SaveBookFormSchema = z.infer<typeof saveBookFormSchema>;

export const useBookDialog = (book?: Book) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<SaveBookFormSchema>({
    resolver: zodResolver(saveBookFormSchema),
    mode: "onSubmit",
    defaultValues: {
      imagem: undefined,
      ...book,
    },
  });

  const qc = useQueryClient();
  const { mutateAsync: updateBookFn } = useMutation({
    mutationFn: updateBook,
    onSuccess(_, { book }) {
      const cached = qc.getQueryData<Book>(["books", book?.id.toString()]);
      if (cached) {
        qc.setQueryData(["books", book?.id.toString()], {
          ...cached,
          ...book,
        });
      }
    },
  });

  const { mutateAsync: createBookFn } = useMutation({
    mutationFn: createBook,
  });

  const handleSaveBookClick = async (data: SaveBookFormSchema) => {
    try {
      if (book) {
        await updateBookFn({ book: { id: book.id, ...data } });
        toast.success(Messages.BOOK_UPDATED);
      } else {
        await createBookFn({ book: data });
        toast.success(Messages.BOOK_CREATED);
      }
      onOpenDialogChange(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onOpenDialogChange = (open: boolean) => {
    setIsOpen(open);
    reset();
  };

  return {
    handleSubmit,
    register,
    handleSaveBookClick,
    onOpenDialogChange,
    errors,
    isOpen,
  };
};
