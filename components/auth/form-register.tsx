"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUpCredentials } from "@/lib/action";
import { RegisterButton } from "@/components/button";
import { Popup } from "@/components/auth/alert";

const FormRegister = () => {
  const router = useRouter();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [state, formAction] = useActionState(signUpCredentials, null);

  if (state?.success && !showSuccessAlert) {
    setShowSuccessAlert(true);

    setTimeout(() => {
      router.push("/login");
    }, 1500);
  }

  return (
    <>
      {showSuccessAlert && (
        <Popup
          message="Sign Up successful! Redirecting to Sign In..."
          type="success"
          onClose={() => setShowSuccessAlert(false)}
        />
      )}

      <form action={formAction} className="space-y-6">
        {state?.message && !state.success ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100"
            role="alert"
          >
            <span className="font-medium">{state.message}</span>
          </div>
        ) : null}

        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="John Doe"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
          />
          <div aria-live="polite" aria-atomic="true">
            <span className="text-sm text-red-500 mt-2">
              {state?.error?.name}
            </span>
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="johndoe@gmail.com"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
          />
          <div aria-live="polite" aria-atomic="true">
            <span className="text-sm text-red-500 mt-2">
              {state?.error?.email}
            </span>
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="**********"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
          />
          <div aria-live="polite" aria-atomic="true">
            <span className="text-sm text-red-500 mt-2">
              {state?.error?.password}
            </span>
          </div>
        </div>

        <div>
          <label
            htmlFor="ConfirmPassword"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Confirm Password
          </label>
          <input
            type="password"
            name="ConfirmPassword"
            placeholder="**********"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
          />
          <div aria-live="polite" aria-atomic="true">
            <span className="text-sm text-red-500 mt-2">
              {state?.error?.ConfirmPassword}
            </span>
          </div>
        </div>

        <RegisterButton />

        <p className="text-sm font-light text-gblack">
          Already have an account?
          <Link href="/login">
            <span className="font-medium pl-1 text-black hover:text-gray-900">
              Sign In
            </span>
          </Link>
        </p>
      </form>
    </>
  );
};

export default FormRegister;
