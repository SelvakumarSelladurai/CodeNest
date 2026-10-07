import { useState } from "react";

type PasswordInputProps = {
  value: string;
  onChange: (value: string) => void;
};

function PasswordInput({
  value,
  onChange, 
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <fieldset className="fieldset">
      <label
        htmlFor="password"
        className="fieldset-label font-medium"
      >
        Password
      </label>

      <div className="relative">
        <input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          autoComplete="current-password"
          placeholder="Enter your password"
          className="input input-bordered h-12 w-full pr-20 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15"
        />

        <button
          type="button"
          onClick={() =>
            setShowPassword((current) => !current)
          }
          className="btn btn-ghost btn-sm absolute right-1 top-1/2 -translate-y-1/2"
          aria-label={
            showPassword
              ? "Hide password"
              : "Show password"
          }
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
    </fieldset>
  );
}

export default PasswordInput;