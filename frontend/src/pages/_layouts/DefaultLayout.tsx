import { Outlet, useNavigate } from "react-router";
import { SideBarMenu } from "@/components/Menus/SideBarMenu";
import { Header } from "@/components/Headers/Header";
import { SubHeader } from "@/components/Headers/SubHeader";
import { useEffect } from "react";
import { api } from "@/lib/axios";
import { isAxiosError } from "axios";
import { useQueryClient } from "@tanstack/react-query";
import type { User } from "@/models/user";

export const DefaultLayout = () => {
  const navigate = useNavigate();
  const qc = useQueryClient()

  useEffect(() => {
    const interceptorId = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (isAxiosError(error)) {
          const status = error.response?.status;

          if (status === 401) {
            qc.setQueryData<User | null>(['me'], null)
          }
        }

        return Promise.reject(error);
      },
    );

    return () => {
      api.interceptors.response.eject(interceptorId);
    };
  }, [navigate, qc]);
  
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
