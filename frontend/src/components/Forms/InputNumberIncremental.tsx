import type { HTMLAttributes } from "react";
import { Minus, Plus } from "react-feather";

interface InputNumberIncremental {
  container: HTMLAttributes<HTMLDivElement>;
}
export const InputNumberIncremental = ({
  container,
}: InputNumberIncremental) => {
  container.className = `border-[0.5px] border-gray-500 w-1/6 px-2.5 py-2 rounded-md flex justify-between ${container.className}`;
  return (
    <div {...container}>
      <button className="cursor-pointer">
        <Minus size={14} />
      </button>
      <span className="font-bold text-sm font-inter">5</span>
      <button className="cursor-pointer">
        <Plus size={14} />
      </button>
    </div>
  );
};
