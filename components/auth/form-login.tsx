"use client";

import { useActionState, useState, useEffect } from "react";
import Link from "next/link";
import { signInCredentials } from "@/lib/action";
import { LoginButton } from "@/components/button";
import { useSearchParams, useRouter } from "next/navigation";
import { Popup } from "@/components/auth/alert";

const FormLogin = () => {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [state, formAction] = useActionState(signInCredentials, null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirectTo = searchParams.get("redirectTo") || "/";

  useEffect(() => {
    if (state?.success) {
      setShowSuccessPopup(true);
      const timer = setTimeout(() => {
        router.push(redirectTo);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [state, redirectTo, router]);

  return (
    <div className="space-y-6">
      {showSuccessPopup && (
        <Popup
          message="Sign In successful! Redirecting to homepage..."
          type="success"
          onClose={() => setShowSuccessPopup(false)}
        />
      )}

      <form action={formAction} className="space-y-6">
        <input type="hidden" name="redirectTo" value={redirectTo} />
        {state?.message ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100"
            role="alert"
          >
            <span className="font-medium">{state?.message}</span>
          </div>
        ) : null}

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
        <LoginButton />
        <p className="text-sm font-light text-black">
          Don&apos;t have an account?
          <Link href="/register">
            <span className="font-medium pl-1 text-black hover:text-gray-900">
              Sign Up Here
            </span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default FormLogin;
