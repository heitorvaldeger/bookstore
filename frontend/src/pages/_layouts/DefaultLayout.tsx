import { Outlet } from "react-router";
import { SideBarMenu } from "../../components/Menus/SideBarMenu";
import { Header } from "../../components/Headers/Header";
import { SubHeader } from "../../components/Headers/SubHeader";

export const DefaultLayout = () => {
  return (
    <main className="min-h-screen flex">
      <SideBarMenu />
      <section className="bg-zinc-50 h-full w-full px-6 space-y-4">
        <Header />
        <SubHeader />
        <Outlet />
      </section>
    </main>
  );
};
