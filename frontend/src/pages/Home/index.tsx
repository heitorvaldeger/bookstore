import productSlide from "@/assets/images/product-slide.png";
import { CategorySection } from "./components/CategorySection";
import { useHome } from "./useHome";
import { NewBooksSection } from "./components/NewBooksSection";
import { PromotionSection } from "./components/PromotionSection";

export const Home = () => {
  const { booksSliced } = useHome();

  return (
    <main className="space-y-6">
      <div className="flex flex-col items-center gap-2">
        <img src={productSlide} className="object-fill w-full" />
        <div className="flex gap-5">
          <span className="inline-block w-2.5 h-2.5 bg-teal-700 rounded-full"></span>
          <span className="inline-block w-2.5 h-2.5 bg-gray-500 rounded-full"></span>
          <span className="inline-block w-2.5 h-2.5 bg-gray-500 rounded-full"></span>
        </div>
      </div>

      <CategorySection />

      <NewBooksSection books={booksSliced ?? []} />

      <PromotionSection books={booksSliced ?? []} />
    </main>
  );
};
