import type { PropsWithChildren } from "react";

export const RadioItem = ({ children, ...props }: PropsWithChildren) => {
  return (
    <div
      {...props}
      className="cursor-pointer data-[state=checked]:bg-teal-700 data-[state=checked]:text-white border-[0.67px] border-gray-700 px-2.5 py-1 uppercase rounded-md"
    >
      {children}
    </div>
  );
};
