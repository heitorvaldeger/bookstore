import { RadioGroup } from "radix-ui";

const categories = [
  {
    id: "all",
    label: "Todos",
  },
  {
    id: "bible",
    label: "Bíblias",
  },
  {
    id: "teology",
    label: "Teologia",
  },
  {
    id: "philo",
    label: "Filosofia",
  },
  {
    id: "science",
    label: "Ciência",
  },
  {
    id: "others",
    label: "Outros...",
  },
];
export const CategoryList = () => {
  return (
    <RadioGroup.Root
      defaultValue="all"
      className="grid grid-cols-2 gap-4 lg:flex lg:items-center lg:justify-center"
    >
      {categories.map((category) => (
        <RadioGroup.Item key={category.id} value={category.id} asChild>
          <div className="px-3 py-1 data-[state=checked]:bg-orange-500 rounded-full data-[state=checked]:text-white text-sm bg-gray-200 text-gray-400">
            {category.label}
          </div>
        </RadioGroup.Item>
      ))}
    </RadioGroup.Root>
  );
};
