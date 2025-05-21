import * as z from "zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessagesValidation } from "@/constans/messages-validation";
import { signIn } from "@/api/sign-in";

const signInFormSchema = z.object({
  email: z
    .string()
    .email(MessagesValidation.MUST_BE_VALID_EMAIL)
    .min(1, MessagesValidation.MUST_BE_REQUIRED),
  password: z.string().min(1, MessagesValidation.MUST_BE_REQUIRED),
});

type SignInForm = z.infer<typeof signInFormSchema>;

export const useLogin = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const { mutateAsync: authenticate, isPending } = useMutation({
    mutationFn: signIn,
  });

  const handleSignIn = async (data: SignInForm) => {
    try {
      await authenticate(data);
      navigate("/");
    } catch (error) {
      alert("Invalid Credentials");
    }
  };

  return {
    handleSubmit,
    register,
    isPending,
    errors,
    handleSignIn,
  };
};
