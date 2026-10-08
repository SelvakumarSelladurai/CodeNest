import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
};

function Button({
  children,
  type = "button",
  loading = false,
  disabled = false,
  fullWidth = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={[
        "btn",
        "btn-primary",
        "btn-lg",
        "min-h-12",
        "font-semibold",
        fullWidth ? "w-full" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {loading && (
        <span
          className="loading loading-spinner loading-sm"
          aria-hidden="true"
        />
      )}

      {loading ? "Signing in..." : children}
    </button>
  );
}

export default Button;