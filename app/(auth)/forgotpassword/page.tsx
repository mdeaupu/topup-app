"use client";

import Link from "next/link";
import { handleForgotPassword } from "@/lib/action";
import { useActionState } from "react";

interface ForgotPasswordState {
  error?: string;
  password?: string | null;
  success?: boolean;
}

export default function ForgotPassword() {
  const [state, formAction] = useActionState<
    ForgotPasswordState | null,
    FormData
  >(handleForgotPassword, null);

  return (
    <div className="flex flex-col items-center justify-between px-6 py-34 mx-auto">
      <div className="w-full bg-[#4578a7] rounded-lg shadow mt-4 max-w-md">
        <div className="w-full max-w-md space-y-8">
          <div className="p-8 rounded-lg shadow-md">
            <form action={formAction} className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  Forgot Password
                </h2>
                <p className="mt-2 text-black">
                  Enter your email to reset your password.
                </p>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-black"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="johndoe@gmail.com"
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Confirm
              </button>

              {state?.error && (
                <p className="p-3 bg-red-100 text-red-500 rounded text-sm">
                  {state.error}
                </p>
              )}

              {state?.success && state?.password && (
                <div className="p-3 bg-green-100 text-green-800 rounded">
                  <p>Your password is: {state.password}</p>
                </div>
              )}
            </form>

            <div className="mt-6 text-center">
              <Link
                href="/login"
                className="font-medium text-black hover:text-gray-900"
              >
                Back to login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
