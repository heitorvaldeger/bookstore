import { Loader } from "react-feather";

export const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <div className="animate-spin"><Loader /></div>
      <p>Carregando...</p>
    </div>
  );
};
