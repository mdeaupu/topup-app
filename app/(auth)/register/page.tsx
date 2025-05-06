import { auth } from "@/auth";
import FormRegister from "@/components/auth/form-register";
import { redirect } from "next/navigation";

const Register = async () => {
  const session = await auth();
  if (session) {
    redirect("/dashboard");
  }
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">Create an account</h1>
      <FormRegister />
    </div>
  );
};

export default Register;
