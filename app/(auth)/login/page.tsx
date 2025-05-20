import { auth } from "@/auth";
import FormLogin from "@/components/auth/form-login";
import { GoogleButton } from "@/components/auth/social-button";
import { LoginSuccessPopup } from "@/components/auth/login-success-popup";
import { redirect } from "next/navigation";
import Link from "next/link";

const Login = async ({
  searchParams,
}: {
  searchParams?: { error?: string; success?: string };
}) => {
  const errorParams = searchParams?.error;
  const successParams = searchParams?.success;
  const session = await auth();

  if (session) {
    if (successParams) {
      return (
        <div>
          <LoginSuccessPopup />
          <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Sign In to your account
            </h1>
            <FormLogin />
            <div className="my-4 flex items-center before:flex-1 before:border-t before:border-gray-300 after:flex-1 after:border-t after:border-gray-300">
              <p className="mx-4 mb-0 text-center font-semibold text-gray-600">
                Or
              </p>
            </div>
            <GoogleButton />
          </div>
        </div>
      );
    }
    redirect("/");
  }

  return (
    <div className="flex flex-col items-center justify-between px-6 py-11 mx-auto">
      <div className="w-full bg-[#4578a7] rounded-lg shadow mt-4  max-w-md">
        <div className="p-6 space-y-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Sign In to your account
            </h1>
          </div>
          {errorParams === "OAuthAccountNotLinked" ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100"
              role="alert"
            >
              <span className="font-medium">
                Account already use by other provider.
              </span>
            </div>
          ) : null}
          <FormLogin />
          <div className="text-sm">
            <Link
              href="/forgotpassword"
              className="font-medium text-black hover:text-gray-900"
            >
              Forgot password?
            </Link>
          </div>
          <div className="my-4 flex items-center before:flex-1 before:border-t before:border-black after:flex-1 after:border-t after:border-black">
            <p className="mx-4 mb-0 text-center font-semibold text-black">Or</p>
          </div>
          <GoogleButton />
        </div>
      </div>
    </div>
  );
};

export default Login;
