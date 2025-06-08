import type { ComponentProps } from "react";

type ButtonProps = ComponentProps<"button">;

export const Button = ({
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) => {
  return (
    <button {...props} type={type} className={`${className} cursor-pointer`}>
      {children}
    </button>
  );
};
