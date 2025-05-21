import { Outlet } from "react-router";
import { SideBarMenu } from "../../components/Menus/SideBarMenu";
import { Header } from "../../components/Headers/Header";
import { SubHeader } from "../../components/Headers/SubHeader";

export const DefaultLayout = () => {
  return (
    <main className="min-h-screen flex">
      <div className="hidden lg:block">
        <SideBarMenu />
      </div>

      <section className="bg-zinc-50 w-full px-6 space-y-4 h-full min-h-screen">
        <Header />
        <SubHeader />
        <Outlet />
      </section>
    </main>
  );
};
