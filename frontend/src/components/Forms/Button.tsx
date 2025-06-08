import type { ComponentProps } from "react";

type ButtonProps = ComponentProps<"button">;

export const Button = ({ className, children, ...props }: ButtonProps) => {
  return (
    <button {...props} className={`${className} cursor-pointer`}>
      {children}
    </button>
  );
};
