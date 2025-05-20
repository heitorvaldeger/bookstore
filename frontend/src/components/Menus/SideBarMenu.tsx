import { Home as HomeIcon, Bell, Settings } from "react-feather";

import avatarImage from "../../assets/images/avatar.png";
import logoImage from "../../assets/images/logo.png";
import { BookMenu } from "./BookMenu";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Link } from "react-router";

export const SideBarMenu = () => {
  return (
    <section className="space-y-4 w-2/5 max-w-[241px]">
      <div className="border-b-2 border-slate-100 px-4 py-4">
        <Link to="/">
          <img src={logoImage} alt="Logo - Bookstore" className="w-2/4" />
        </Link>
      </div>

      <div className="flex flex-col gap-6 px-4 h-[440px]">
        <div className="flex gap-2 items-center">
          <HomeIcon size={15} />
          <span className="font-bold text-sm">Início</span>
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
      </div>

      <div className="flex px-4 space-x-2 items-center border-t-2 border-slate-100 py-4 justify-center">
        <div className="w-7 h-7 rounded-full flex items-center justify-center">
          <img
            src={avatarImage}
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
