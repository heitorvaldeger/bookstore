import { Menu } from "react-feather";
import { SideBarMenu } from "../Menus/SideBarMenu";
import { Drawer } from "vaul";
import { CartDialog } from "../Cart/CartDialog";

export const Header = () => {
  return (
    <header className="flex justify-between py-4 border-b-2 border-slate-100 items-center">
      <div className="lg:hidden">
        <Drawer.Root direction="left">
          <Drawer.Trigger>
            <Menu />
          </Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/40" />
            <Drawer.Content className="bg-white absolute left-0 top-0 bottom-0 overflow-y-auto outline-none max-h-screen overflow-auto">
              <SideBarMenu />
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      </div>
      <span className="font-bold text-3xl text-gray-700">Todos Livros</span>
      <CartDialog />
    </header>
  );
};
