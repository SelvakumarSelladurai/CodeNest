import { useState, type FormEvent } from "react";
import { SiGithub, SiGoogle } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";

import Button from "../../../components/ui/Button";
import type { LoginFormData } from "../types";
import PasswordInput from "./PasswordInput";

const DEMO_EMAIL = "selvakumar@gmail.com";
const DEMO_PASSWORD = "Selva@5973";

function LoginForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setError("");

    if (!formData.email || !formData.password) {
      setError("Please enter your email address and password.");
      return;
    }

    setIsSubmitting(true);

    // Temporary simulation.
    // Real authentication will be connected later.
    await new Promise((resolve) =>
      setTimeout(resolve, 1000),
    );

    if (
      formData.email === DEMO_EMAIL &&
      formData.password === DEMO_PASSWORD
    ) {
      console.log("Login successful");

      navigate("/dashboard");
    } else {
      setError("Invalid email address or password.");
    }

    setIsSubmitting(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="w-full"
    >
      {/* Header */}
      <div className="mb-7">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary">
          Welcome back
        </p>

        <h1 className="mt-2 text-2xl font-bold tracking-tight text-base-content sm:text-3xl">
          Sign in to your account
        </h1>

        <p className="mt-2 max-w-md text-sm leading-5 text-base-content/60">
          Continue your learning journey and make progress
          towards your goals.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-5 rounded-lg border border-error/20 bg-error/10 px-4 py-3 text-sm text-error">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <fieldset className="fieldset">
          <label
            htmlFor="email"
            className="fieldset-label font-medium"
          >
            Email address
          </label>

          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={(event) =>
              setFormData((current) => ({
                ...current,
                email: event.target.value,
              }))
            }
            autoComplete="email"
            placeholder="you@example.com"
            className="input input-bordered h-11 w-full bg-base-100 
              focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15
            "
          />
        </fieldset>

        <PasswordInput
          value={formData.password}
          onChange={(password) =>
            setFormData((current) => ({
              ...current,
              password,
            }))
          }
        />
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <label className="flex cursor-pointer items-center gap-2 text-sm text-base-content/70">
          <input
            type="checkbox"
            checked={formData.rememberMe}
            onChange={(event) =>
              setFormData((current) => ({
                ...current,
                rememberMe: event.target.checked,
              }))
            }
            className="checkbox checkbox-primary checkbox-sm"
          />

          <span>Remember me</span>
        </label>

        <Link
          to="/forgot-password"
          className="text-sm font-semibold text-primary transition-colors hover:text-primary/80 hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      <div className="mt-6">
        <Button
          type="submit"
          loading={isSubmitting}
          fullWidth
        >
          Sign in
        </Button>
      </div>

      <div className="divider my-5 text-[10px] font-medium tracking-wide text-base-content/40">
        OR CONTINUE WITH
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          className="btn h-11 min-h-11 border-black bg-black text-sm font-medium
           text-white hover:border-gray-800 hover:bg-gray-800
          "
        >
          <SiGithub
            size={17}
            aria-hidden="true"
          />

          <span>GitHub</span>
        </button>

        <button
          type="button"
          className="btn h-11 min-h-11 border border-[#e5e5e5] bg-white text-sm
             font-medium text-black hover:bg-gray-50
          "
        >
          <SiGoogle
            size={17}
            aria-hidden="true"
          />

          <span>Google</span>
        </button>
      </div>

      <p className="mt-5 text-center text-sm text-base-content/60">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-semibold text-primary transition-colors hover:text-primary/80 hover:underline"
        >
          Create one
        </Link>
      </p>
    </form>
  );
}

export default LoginForm;