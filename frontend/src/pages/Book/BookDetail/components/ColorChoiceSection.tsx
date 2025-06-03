import { RadioGroup } from "radix-ui";
import { useBookDetail } from "../useBookDetail";

const colors = [
  {
    className: "bg-orange-300",
    label: "Laranja",
  },
  {
    className: "bg-blue-400",
    label: "Azul",
  },
  {
    className: "bg-orange-200",
    label: "Amarelo Claro",
  },
  {
    className: "bg-white border border-zinc-200",
    label: "Branco",
  },
  {
    className: "bg-gray-400",
    label: "Cinza",
  },
];
export const ColorChoiceSection = () => {
  const { color, handleUpdateColorRadio } = useBookDetail();
  return (
    <div className="space-y-2 my-6">
      <p className="font-inter font-bold text-lg">
        Cor:
        <span className="font-inter font-normal mx-1">{color}</span>
      </p>
      <RadioGroup.Root
        defaultValue={color}
        onValueChange={handleUpdateColorRadio}
        className="flex gap-4"
      >
        {colors.map((color) => (
          <RadioGroup.Item key={color.label} value={color.label} asChild>
            <div
              className={`w-7 h-7 cursor-pointer ${color.className} rounded-full data-[state=checked]:border-2 data-[state=checked]:border-white data-[state=checked]:outline-2`}
            ></div>
          </RadioGroup.Item>
        ))}
      </RadioGroup.Root>
    </div>
  );
};
