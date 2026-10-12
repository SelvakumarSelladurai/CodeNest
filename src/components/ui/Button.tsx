import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "error";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  fullWidth?: boolean;
};

const VARIANT_CLASS = {
  primary: "btn-primary",
  secondary: "btn-outline",
  ghost: "btn-ghost",
  error: "btn-error",
} as const;

const SIZE_CLASS = {
  sm: "btn-sm",
  md: "",
  lg: "btn-lg",
} as const;

function Button({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={[
        "btn",
        VARIANT_CLASS[variant],
        SIZE_CLASS[size],
        "font-semibold transition-transform duration-200 hover:scale-[1.02] active:scale-[0.97] motion-reduce:transform-none",
        fullWidth && "w-full",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {loading && (
        <span className="loading loading-spinner loading-sm" aria-hidden="true" />
      )}
      {children}
    </button>
  );
}

export default Button;