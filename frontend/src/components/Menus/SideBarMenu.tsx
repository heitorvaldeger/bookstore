import { Home as HomeIcon, Bell, Settings, User, Plus } from "react-feather";

import { BookMenu } from "./BookMenu";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Link } from "react-router";
import { useAdmin } from "@/contexts/AdminContext";
import { BookDialog } from "../Dialogs/BookDialog";
import { Button } from "../Forms/Button";

export const SideBarMenu = () => {
  const { isLogged } = useAdmin();
  return (
    <section className="space-y-4 bg-white">
      <div className="border-b-2 border-slate-100 px-4 py-4">
        <Link to="/">
          <img
            src="/images/logo.png"
            alt="Logo - Bookstore"
            className="w-2/6 lg:w-2/4"
          />
        </Link>
      </div>

      <div className="flex flex-col gap-6 px-4 h-[440px]">
        <div className="flex gap-2 items-center">
          <HomeIcon size={15} />
          <Link to="/">
            <span className="font-bold text-sm">Início</span>
          </Link>
        </div>
        <div className="flex gap-2 items-center">
          <Bell size={15} />
          <span className="font-bold text-sm">Notificações</span>
        </div>
        <BookMenu />
        <div className="flex gap-2 items-center">
          <Settings size={15} />
          <span className="font-bold text-sm">Configurações</span>
        </div>

        {!isLogged ? (
          <Link
            to="/login"
            className="flex gap-2 bg-teal-700 items-center text-white py-2 justify-center rounded-lg cursor-pointer"
          >
            <User size={15} />
            Acessar sistema
          </Link>
        ) : (
          <BookDialog>
            <Button className="flex gap-2 items-center font-bold text-sm">
              <Plus size={15} />
              Novo Livro
            </Button>
          </BookDialog>
        )}
      </div>

      <div className="flex px-4 space-x-2 items-center border-t-2 border-slate-100 py-4 justify-center">
        <div className="w-7 h-7 rounded-full flex items-center justify-center">
          <img
            src="/images/avatar.png"
            alt="JD"
            className="w-full h-full rounded-full"
          />
        </div>

        <div className="flex flex-1 justify-between items-center">
          <span className="font-roboto">Menino Feliz</span>
          <CaretSortIcon />
        </div>
      </div>
    </section>
  );
};
