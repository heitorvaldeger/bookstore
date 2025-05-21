import logoImage from "@/assets/images/logo.png";
import { Loader } from "react-feather";
import { Input } from "@/components/Forms/Input";
import { useLogin } from "./useLogin";

export const Login = () => {
  const { handleSignIn, handleSubmit, register, isPending, errors } =
    useLogin();

  return (
    <main className="flex h-screen items-center">
      <section className="flex-1 flex flex-col items-center space-y-4">
        <img src={logoImage} alt="Logo - Bookstore" className="w-[126px]" />

        <div className="space-y-4 w-[447px] px-[4.5rem] pt-[1.813rem] pb-[2.188rem] flex flex-col items-center border-[3px] border-gray-200 rounded-3xl shadow-lg">
          <p className="font-bold text-2xl">Login da marca</p>

          <form
            onSubmit={handleSubmit(handleSignIn)}
            className="space-y-4 w-full flex flex-col items-center"
          >
            <div className="flex flex-col w-full">
              <label htmlFor="email" className="font-medium text-sm">
                E-mail
              </label>
              <Input
                {...register("email")}
                type="email"
                className="border-[1px] border-zinc-100 py-2 px-1 rounded-lg"
                error={errors.email?.message}
              />
            </div>

            <div className="flex flex-col w-full">
              <label htmlFor="password" className="font-medium text-sm">
                Senha
              </label>
              <Input
                {...register("password")}
                type="password"
                className="border-[1px] border-zinc-100 py-2 px-1 rounded-lg"
                error={errors.password?.message}
              />
            </div>

            <button
              type="submit"
              className="cursor-pointer bg-teal-700 w-full text-sm font-medium py-2 px-6 text-white rounded-lg flex items-center justify-center"
            >
              {isPending ? <Loader className="animate-spin" /> : "Entrar"}
            </button>
            <button className="border-zinc-100 cursor-pointer font-medium text-xs text-gray-500 border-[1px] rounded-lg py-2 px-6 w-3/4">
              Esqueci minha senha
            </button>
          </form>
        </div>

        <p className="flex gap-2 items-center">
          Não possui conta?
          <span className="text-teal-700 underline">Click Aqui!</span>
        </p>
      </section>
      <section className="relative h-screen sm:hidden xl:block">
        <div className="absolute flex flex-col justify-center 2xl:min-w-3/4 px-6 mt-28 md:w-3/4">
          <p className="font-bold 2xl:text-4xl md:text-2xl text-white leading-[100%]">
            Bem-vindo{"(a)"} de volta ao the Library
          </p>
          <p className="text-white">
            Entre com sua conta para utilizar a plataforma
          </p>
          <div></div>
        </div>
        <img
          src="/images/cover-signin.png"
          alt=""
          className="px-2 py-2 h-screen"
        />
      </section>
    </main>
  );
};
