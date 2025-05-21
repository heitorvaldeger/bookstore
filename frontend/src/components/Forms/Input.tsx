import type { HTMLAttributes } from "react";

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  type: "text" | "password" | "email";
  error?: string;
}

export const Input = ({ error, ...props }: InputProps) => {
  return (
    <>
      <input {...props} />
      <span className="text-red-500 text-sm">{error}</span>
    </>
  );
};
