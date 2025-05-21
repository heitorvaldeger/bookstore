import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { User } from "react-feather";
import { CaretRightIcon } from "@radix-ui/react-icons";

export function AdminMenu() {
  return (
    <NavigationMenu.Root className="relative z-10">
      <NavigationMenu.List className="flex flex-col">
        <NavigationMenu.Item>
          <NavigationMenu.Trigger asChild>
            <div className="group flex gap-2 items-center">
              <User size={15} />
              <div className="flex flex-1 justify-between items-center">
                <span className="font-bold text-sm">Área administrativa</span>
                <CaretRightIcon
                  className="relative transition-transform duration-250 ease-[ease] group-data-[state=open]:rotate-90"
                  aria-hidden
                />
              </div>
            </div>
          </NavigationMenu.Trigger>

          <NavigationMenu.Content className="mt-2 w-48 rounded-md bg-white space-y-1">
            <a
              href="#"
              className="flex text-sm justify-between items-center px-3 py-2 hover:bg-gray-100 rounded-md text-black"
            >
              Cadastrar/Editar um livro
            </a>

            <a
              href="#"
              className="flex text-sm justify-between items-center px-3 py-2 hover:bg-gray-100 rounded-md text-black"
            >
              Excluir um livro
            </a>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
