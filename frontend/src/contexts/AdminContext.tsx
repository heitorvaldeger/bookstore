import { fetchUser } from "@/api/fetch-user";
import { Loading } from "@/components/Loading";
import { useQuery } from "@tanstack/react-query";
import {
  createContext,
  useContext,
  type PropsWithChildren,
} from "react";

export interface AdminContextProps {
  isLogged: boolean;
}

const AdminContext = createContext({} as AdminContextProps);

export const AdminProvider = ({ children }: PropsWithChildren) => {
  const {
    data: user,
    isLoading,
  } = useQuery({
    queryKey: ["me"],
    queryFn: () => fetchUser(),
  });

  const isLogged = !!user

  if (isLoading) {
    return <Loading/>
  }

  return (
    <AdminContext
      value={{
        isLogged,
      }}
    >
      {children}
    </AdminContext>
  );
};

export const useAdmin = () => {
  return useContext(AdminContext);
};
