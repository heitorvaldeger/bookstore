import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { BookSearch } from "./pages/Book/BookSearch";
import { DefaultLayout } from "./pages/_layouts/DefaultLayout";
import { BookDetail } from "./pages/Book/BookDetail";

export const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "books",
        element: <BookSearch />,
      },
      {
        path: "books/:id",
        element: <BookDetail />,
      },
    ],
  },
]);
