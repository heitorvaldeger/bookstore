import { RouterProvider } from "react-router";
import { router } from "./routes";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query";
import { CartProvider } from "./contexts/CartContext";
import { Toaster } from "sonner";
import { AdminProvider } from "./contexts/AdminContext";

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AdminProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </AdminProvider>
      <Toaster richColors />
    </QueryClientProvider>
  );
};
