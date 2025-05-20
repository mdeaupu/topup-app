import { auth } from "@/auth";
import FormRegister from "@/components/auth/form-register";
import { redirect } from "next/navigation";

const Register = async () => {
  const session = await auth();
  if (session) {
    redirect("/");
  }
  return (
    <div className="flex flex-col items-center justify-between px-6 py-5 mx-auto">
      <div className="w-full bg-[#4578a7] rounded-lg shadow max-w-md">
        <div className="p-6 space-y-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Create an account
            </h1>
          </div>
          <FormRegister />
        </div>
      </div>
    </div>
  );
};

export default Register;
