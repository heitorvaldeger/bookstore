import { BookCard } from "../../../components/Cards/BookCard";

export const BookSearch = () => {
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
      {Array.from({ length: 15 }).map((_, i) => (
        <BookCard key={i} isNew={true} value={467.9} />
      ))}
    </div>
  );
};
