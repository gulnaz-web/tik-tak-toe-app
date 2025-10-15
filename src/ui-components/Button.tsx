import clsx from "clsx";
import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  size: "md" | "lg";
  variant: "primary" | "outline";
  onClick?: () => void;
  disabled?: boolean;
};

export function Button({
  children,
  className,
  size,
  variant,
  ...props
}: ButtonProps) {
  const buttonClassName = clsx(
    "transition-colors",
    className,
    {
      md: "rounded px-6 py-2 text-sm leading-tight",
      lg: "rounded-lg px-5 py-2 text-2xl leading-tight",
    }[size],
    {
      primary: "bg-sky-600 hover:bg-sky-500 text-white ",
      outline: "border border-sky-600 text-sky-600 hover:bg-sky-50",
    }[variant],
  );

  return (
    <button className={buttonClassName} {...props}>
      {children}
    </button>
  );
}
