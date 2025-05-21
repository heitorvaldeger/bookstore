import { createContext, useState, type PropsWithChildren } from "react";

export interface AdminContextProps {
  isLogged: boolean;
  setLoggedState: () => void;
}

const AdminContext = createContext({} as AdminContextProps);

export const AdminProvider = ({ children }: PropsWithChildren) => {
  const [isLogged, setIsLogged] = useState(false);

  const setLoggedState = () => {
    setIsLogged(true);
  };

  return (
    <AdminContext
      value={{
        isLogged,
        setLoggedState,
      }}
    >
      {children}
    </AdminContext>
  );
};
