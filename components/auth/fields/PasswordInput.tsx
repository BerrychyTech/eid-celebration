// src/components/auth/fields/PasswordInput.tsx
import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  error?: string | null;
};

export default function PasswordInput({ id, label, error, className = "", ...inputProps }: Props) {
  const [show, setShow] = React.useState(false);

  const base = `w-full px-3 py-2 pr-10 rounded-md border bg-card dark:bg-dark-card border-gray-300 dark:border-gray-600 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary ${className}`;

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-1">
        {label}
      </label>
      <div className="relative">
        <input id={id} type={show ? "text" : "password"} className={base} {...(inputProps as any)} />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute right-2 top-2 text-sm text-gray-600"
          tabIndex={-1}
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? "Hide" : "Show"}
        </button>
      </div>
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
}
