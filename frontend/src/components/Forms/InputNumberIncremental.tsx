import { Minus, Plus } from "react-feather";

interface InputNumberIncremental {
  value?: number;
  containerClassName?: string;
  onValueChange: (value: number) => void;
}
export const InputNumberIncremental = ({
  onValueChange,
  containerClassName,
  value = 1,
}: InputNumberIncremental) => {
  const handleMinusButtonClick = () => {
    if (value > 0) {
      onValueChange(value - 1);
    }
  };

  const handlePlusButtonClick = () => {
    onValueChange(value + 1);
  };

  return (
    <div
      className={`border-[0.5px] border-gray-500 w-1/6 px-2.5 py-2 rounded-md flex justify-between ${containerClassName}`}
    >
      <button onClick={handleMinusButtonClick} className="cursor-pointer">
        <Minus size={14} />
      </button>
      <span className="font-bold text-sm font-inter">{value}</span>
      <button onClick={handlePlusButtonClick} className="cursor-pointer">
        <Plus size={14} />
      </button>
    </div>
  );
};
