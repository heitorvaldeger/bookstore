import * as z from "zod";
import { MessagesValidation } from "../../../constans/messages-validation";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const bookSearchSchema = z.object({
  q: z.string().min(1, MessagesValidation.MUST_BE_REQUIRED),
});

type BookSearchSchema = z.infer<typeof bookSearchSchema>;
export const useSubHeader = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<BookSearchSchema>({
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

  return {
    handleSearch,
    handleSubmit,
    register,
    errors,
  };
};
