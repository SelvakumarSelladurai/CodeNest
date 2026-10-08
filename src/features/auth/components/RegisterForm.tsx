import {
  useState,
  type FormEvent,
} from "react";
import { Link } from "react-router-dom";

import Button from "../../../components/ui/Button";
import type { RegisterFormData } from "../types";
import PasswordInput from "./PasswordInput";

function RegisterForm() {
  const [formData, setFormData] =
    useState<RegisterFormData>({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [error, setError] = useState("");

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setError("");

    if (!formData.fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!formData.email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!formData.password) {
      setError("Please enter a password.");
      return;
    }

    if (formData.password.length < 8) {
      setError(
        "Password must contain at least 8 characters.",
      );
      return;
    }

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    // Temporary registration simulation.
    // Real API integration will come later.
    await new Promise((resolve) =>
      setTimeout(resolve, 1000),
    );

    console.log("Registration data:", formData);

    setIsSubmitting(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="w-full"
    >
      <div className="mb-7">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary">
          Get started
        </p>

        <h1 className="mt-2 text-2xl font-bold tracking-tight text-base-content sm:text-3xl">
          Create your account
        </h1>

        <p className="mt-2 text-sm leading-5 text-base-content/60">
          Start building knowledge that stays with you.
        </p>
      </div>

      {error && (
        <div
          role="alert"
          className="alert alert-error mb-5 text-sm"
        >
          <span>{error}</span>
        </div>
      )}

      <div className="space-y-4">
        <fieldset className="fieldset">
          <label
            htmlFor="fullName"
            className="fieldset-label font-medium"
          >
            Full name
          </label>

          <input
            id="fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={(event) =>
              setFormData((current) => ({
                ...current,
                fullName: event.target.value,
              }))
            }
            autoComplete="name"
            placeholder="Your full name"
            className="input input-bordered h-11 w-full bg-base-100
              focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15
            "
          />
        </fieldset>

        <fieldset className="fieldset">
          <label
            htmlFor="register-email"
            className="fieldset-label font-medium"
          >
            Email address
          </label>

          <input
            id="register-email"
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

        <fieldset className="fieldset">
          <label
            htmlFor="confirmPassword"
            className="fieldset-label font-medium"
          >
            Confirm password
          </label>

          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={(event) =>
              setFormData((current) => ({
                ...current,
                confirmPassword:
                  event.target.value,
              }))
            }
            autoComplete="new-password"
            placeholder="Confirm your password"
            className="input input-bordered h-11 w-full bg-base-100
              focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15
            "
          />
        </fieldset>
      </div>

      <div className="mt-6">
        <Button
          type="submit"
          loading={isSubmitting}
          fullWidth
        >
          Create account
        </Button>
      </div>

      <p className="mt-5 text-center text-sm text-base-content/60">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-primary transition-colors hover:text-primary/80 hover:underline
          "
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}

export default RegisterForm;