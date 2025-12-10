// src/components/auth/fields/TextInput.tsx
import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  error?: string | null;
};

export default function TextInput({ id, label, error, className = "", ...inputProps }: Props) {
  // Shared input classes
  const base = `w-full px-3 py-2 rounded-md border bg-card dark:bg-dark-card border-gray-300 dark:border-gray-600 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary ${className}`;

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-1">
        {label}
      </label>
      <input id={id} className={base} {...(inputProps as any)} />
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
}
