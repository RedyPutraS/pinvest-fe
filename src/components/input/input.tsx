import type { InputHTMLAttributes, ReactNode } from "react";
import React from "react";
import { cn } from "utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  preInput?: ReactNode;
  suffix?: ReactNode;
  classNameContainer?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { classNameContainer, className, type, name, suffix, preInput, ...props },
    ref
  ) => {
    return (
      <div
        className={cn(
          "relative flex w-full overflow-hidden border-b border-pv-grey-medium1 bg-white p-2",
          "flex border-b border-slate-300 bg-transparent py-2 px-3 text-sm placeholder:text-slate-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus:ring-slate-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50 dark:focus-within:ring-slate-400 dark:focus-within:ring-offset-slate-900",
          classNameContainer
        )}
      >
        {preInput}
        <input
          ref={ref}
          id={name}
          name={name}
          type={type}
          className={cn("flex-grow bg-white focus:outline-none", className)}
          {...props}
        />
        {suffix}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
