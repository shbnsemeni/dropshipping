import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger" | "ghost" | "accent";
  size?: "sm" | "md" | "lg" | "xl";
  children: ReactNode;
  loading?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  loading,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const variants = {
    primary: "bg-stone-900 text-white hover:bg-stone-800 shadow-sm",
    secondary: "bg-stone-100 text-stone-900 hover:bg-stone-200",
    accent: "bg-rose-500 text-white hover:bg-rose-600 shadow-sm shadow-rose-200",
    outline: "border-2 border-stone-300 text-stone-700 hover:bg-stone-50",
    danger: "bg-red-600 text-white hover:bg-red-700 shadow-sm",
    ghost: "text-stone-600 hover:bg-stone-100",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3 text-sm",
    xl: "px-10 py-4 text-base",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]",
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  );
}
