import type { ComponentProps } from "react";

interface InputProps extends ComponentProps<"input"> {
  error?: string;
}

export const Input = ({ error, ...props }: InputProps) => {
  return (
    <div className="flex flex-col">
      <input {...props} />
      <span className="text-red-500 text-sm">{error}</span>
    </div>
  );
};
