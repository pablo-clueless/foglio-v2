"use client";

import { EyeIcon, EyeOffIcon, LoaderIcon, SearchIcon } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

interface Props extends React.ComponentProps<"input"> {
  error?: { touched?: boolean; message?: string };
  helperText?: string;
  label?: string;
  inputClassName?: string;
  isLoading?: boolean;
  labelClassName?: string;
  wrapperClassName?: string;
}

function Input({
  className,
  error,
  helperText,
  id,
  inputClassName,
  isLoading,
  label,
  labelClassName,
  name,
  required,
  wrapperClassName,
  type,
  ...props
}: Props) {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className={cn("w-full space-y-0.5", wrapperClassName)}>
      {label && (
        <label
          className={cn(
            "text-sm font-medium text-gray-400",
            labelClassName,
            required && "after:ml-1 after:text-red-500 after:content-['*']",
          )}
          htmlFor={name ?? id}
        >
          {label}
        </label>
      )}
      <div
        className={cn(
          "focus-within:border-primary-400 flex h-9 min-w-0 items-center gap-x-2 border px-3 py-1 shadow-xs transition-[color,box-shadow,border] duration-300 outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
          inputClassName,
        )}
      >
        {type === "search" && <SearchIcon className="size-4 text-neutral-700" />}
        <input
          type={showPassword ? "text" : type}
          name={name}
          id={id}
          data-slot="input"
          className={cn(
            "file:text-foreground h-full w-full border-0 bg-transparent text-sm outline-0 transition-all duration-300 placeholder:text-gray-400 focus:border-0 focus:outline-0 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "aria-invalid:border-red-500",
            className,
          )}
          onWheel={(e) => e.currentTarget.blur()}
          {...props}
        />
        {isLoading && <LoaderIcon className="size-4 animate-spin text-neutral-700" />}
        {type === "password" && (
          <button onClick={() => setShowPassword((prev) => !prev)} type="button">
            {showPassword ? (
              <EyeOffIcon className="size-4 text-neutral-700" />
            ) : (
              <EyeIcon className="size-4 text-neutral-700" />
            )}
          </button>
        )}
      </div>
      {error?.touched && error?.message ? (
        <span className="text-xs text-red-500">{error.message}</span>
      ) : helperText ? (
        <span className="text-xs text-neutral-500">{helperText}</span>
      ) : null}
    </div>
  );
}

export { Input };
