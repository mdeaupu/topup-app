"use client";

import { useFormStatus } from "react-dom";

export const LoginButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="w-full text-white bg-blue-700 font-medium rounded-lg px-6 py-2.5 text-center uppercase cursor-pointer hover:bg-blue-800"
    >
      {pending ? "Authtenticating..." : "Sign In"}
    </button>
  );
};

export const RegisterButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="w-full text-white bg-blue-700 font-medium rounded-lg px-6 py-2.5 text-center uppercase cursor-pointer hover:bg-blue-800"
    >
      {pending ? "Registering..." : "Register"}
    </button>
  );
};
